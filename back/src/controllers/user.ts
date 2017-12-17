import { UserModel } from '../models/mongo';
import { Mail } from "./mail";
import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import * as seedrandom from "seedrandom";
import * as moment from "moment";

import * as config from "../config/config";
let debug = require('debug')('user');


export class User {
	constructor() { } 

	public login(req, res) {
		let username = req.body.username || '';
		let password = req.body.password || '';
		let verifycode = req.body.verifycode || '';

		if (username == '' || password == '') {
			return res.sendStatus(401);
		}

		UserModel.findOne({ username: username }, (err, user) => {
			if (err) {
				debug(err);
				return res.sendStatus(401);
			}

			if (user == undefined) {
				return res.sendStatus(401);
			}
			if (verifycode) {
				user.verifyCode(verifycode, (isMatch) => {
					if (!isMatch) {
						return res.sendStatus(401);
					} else if (isMatch == 1) {
						user.encryptPassword(password, (hash) => {
							UserModel.update(
								{ username: user.username },
								{ password: hash, verifycode: {} },
								(err, nbRow) => {
									if (err) {
										debug(err);
										return res.sendStatus(500);
									}
									let token = this.generateToken(user);
									return res.json({ token: token });
								});
						});
					} else if (isMatch == 2) {
						if (user.verifycode['count'] > 0) {
							user.verifycode['count']--;
							UserModel.update({ username: user.username },
								{ verifycode: user.verifycode },
								(err, nbRow) => {
									if (err) {
										debug(err);
										return res.sendStatus(500);
									}
									return res.sendStatus(403);
								});
						} else {
							return res.sendStatus(404);
						}
					}
				});
			} else {
				user.comparePassword(password, (isMatch) => {
					if (!isMatch) {
						debug("Failed to login with " + user.username);
						return res.sendStatus(401);
					}

					let token = this.generateToken(user);
					return res.json({ token: token });
				});
			}

		});
	};

	generateToken(user){
		let token = jwt.sign({ id: user._id, username: user.username, is_admin: user.is_admin }, config.secret_token, { expiresIn: config.token_expiration });
		return token;
	}

	public register(req, res) {
		let username = req.body.username || '';
		let password = req.body.password || '';

		if (username == '' || password == '') {
			return res.sendStatus(400);
		}

		let user = new UserModel();
		user.username = username;
		user.password = password;

		user.save( (err) => {
			if (err) {
				debug(err);
				return res.sendStatus(500);
			}

			UserModel.count((err, counter) => {
				if (err) {
					debug(err);
					return res.sendStatus(500);
				}

				if (counter == 1) {
					UserModel.update({ username: user.username },
						{ is_admin: true }, (err, nbRow) => {
							if (err) {
								debug(err);
								return res.sendStatus(500);
							}

							debug('First user created as an Admin');
							let token = this.generateToken(user);
							return res.json({ token: token });
						});
				}
				else {
					let token = this.generateToken(user);
					return res.json({ token: token });
				}
			});
		});
	}


	sendVerifyCode(req, res) {
		let username = req.body.username || '';

		if (username == '') {
			return res.sendStatus(400);
		}

		UserModel.findOne({ username: username }, (err, user) => {
			if (err) {
				debug(err);
				return res.sendStatus(401);
			}

			if (user == undefined) {
				return res.sendStatus(401);
			}
			//verifycode can be used for 5 times
			if (user.verifycode && user.verifycode['count'] > 0) {
				return res.sendStatus(402);
			} else {
				let rng = seedrandom();
				let c = rng.int32() / 100000;
				let code = Math.abs(parseInt(c.toString()));
				let verifycode_mix = {
					verifycode: code,
					count: 5,
					date: moment().format()
				}

				
				Mail.sendmail(user, code).then((data)=>{
					UserModel.update({ username: user.username }, { verifycode: verifycode_mix }, (err, nbRow) => {
						if (err) {
							debug(err);
							return res.sendStatus(500);
						}
						return res.json({ mailstatus: 0 });
					});
				});
			}
		}); 
	}

	getUserInfo(req, res) {
		let id = req.user.id || '';

		if (!id) {
			return res.sendStatus(404)
		}

		UserModel.aggregate(
			[
				{
					$match:
					{ _id: new mongoose.Types.ObjectId(id) }
				},
				{
					$project:
					{
						activities_fans_count:
						{
							$size:
							{ "$ifNull": ["$activities_fans", []] }
						},
						activities_subs_count:
						{
							$size:
							{ "$ifNull": ["$activities_subs", []] }
						},
						_id: 1
					}
				}
			])
			.exec((err, result) => {
				if (err) {
					debug(err);
					return res.sendStatus(404);
				} else {
					return res.json(result);
				}
			});
	};

	getUserCoin(req, res){
		let id = req.user.id || '';
		
				if (!id) {
					return res.sendStatus(404)
				}
		
				UserModel.aggregate(
					[
						{
							$match:
							{ _id: new mongoose.Types.ObjectId(id) }
						},
						{
							$project:
							{
								my_coin : 1,
								_id: 1
							}
						}
					])
					.exec((err, result) => {
						if (err) {
							debug(err);
							return res.sendStatus(404);
						} else {
							return res.json(result);
						}
					});
	}

	updateUserCoin(req, res){
		let id = req.user.id || '';
		let coin = req.body.my_coin || '';
		if (!id) {
			return res.sendStatus(404)
		}
		if (! /^\d+$/.test(coin)) {
			return res.sendStatus(404)
		}else{
			coin = parseInt(coin);
		}
		let subscribe_record = {
			coin : coin,
			date: moment().format()
		}
		
		UserModel.update({ _id: id }, { 
			$inc: { my_coin: coin },
			$addToSet: { subscribe_list: subscribe_record }
		 }, function (err) {
			if (err) {
				debug(err);
				return res.sendStatus(500);
			}
			return res.json('ok');
		})
	}

	getTotalCoin(req, res){
		let rad = Math.round(Math.random() * 1000) / 1000;
		let total = moment("21000101").unix() - moment().unix() - rad;
		total = Math.floor(total);
		let result = {
			total : total
		}
		return res.json(result);

	}

}