export interface UserGetRes {
    _id: string;
    username: string;
    email: string;
    exams_written: string[];
}


export interface UserDeleteRes {
    message: string;
}