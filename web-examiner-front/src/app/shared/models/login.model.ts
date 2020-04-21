export interface LoginReq {
    username_email: string;
    password: string;
}

export interface LoginRes {
    message: string;
    token: string;
    email: string;
}