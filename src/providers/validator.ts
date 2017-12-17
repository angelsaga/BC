import { FormControl } from '@angular/forms';


export function emailValidator(control: FormControl): { [s: string]: boolean } {
        if (!control.value || !control.value.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)) {
                return { invalidEmail: true };
        }
}

export function nicknameValidator(control: FormControl): { [s: string]: boolean } {
        if (!control.value || !control.value.match(/^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/)) {
                return { invalidNickname: true };
        }
}

export function subscribeValidator(control: FormControl): { [s: string]: boolean } {
        if (!control.value || !control.value.match(/^\s*\d+\s*$/)) {
                return { invalidSubscribe: true };
        }
}