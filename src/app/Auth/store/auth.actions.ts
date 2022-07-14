
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export class LogIn {
    readonly type = LOGIN;
    constructor(public payload : {email:string, userId:string, token: string, expirationDate: Date}){}
}

export class LogOut {
    readonly type = LOGOUT;
}

export type AuthActions = LogIn | LogOut;