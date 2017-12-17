import * as nodemailer from "nodemailer";
let debug = require('debug')('mail');
//let config = require('../../bin/config');
import * as config from "../config/config";


export class Mail {
	
	constructor(
	) {
	} 

	static sendmail(user, code){
		return new Promise((resolve, reject) =>{
			let transporter = nodemailer.createTransport({
				service: config.mail_service,
				auth: {
					user: config.mail_user,
					pass: config.mail_passwd
				}
			});
			
			// setup email data with unicode symbols
			let mailOptions = {
					from: config.mail_user,
					to: user.username,
					subject: 'BC: Verification Code',
					text: 'Verification Code: ' + code 
			};
		
			// send mail with defined transport object
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
					reject(error);
				}
				resolve(info);
				console.log('Message %s sent: %s', info.messageId, info.response);
			});
		})
		
	}

	static sendmail1(user, code){
		return new Promise((resolve, reject) =>{
			let transporter = nodemailer.createTransport({
				host: '127.0.0.1',
				port: 25,			
				tls:{
					rejectUnauthorized: false
				}
				});
		
			// setup email data with unicode symbols
			let mailOptions = {
					from: 'bc <test@176.122.178.158.16clouds.com>',
					to: user.username,
					subject: 'BC: Verification Code',
					text: 'Verification Code: ' + code 
			}; 
		
			// send mail with defined transport object
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
					reject(error);
				}
				resolve(info);
				console.log('Message %s sent: %s', info.messageId, info.response);
			});
		})
	}
}

