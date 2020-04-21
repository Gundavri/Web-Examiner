import { UserGetRes } from "./user";

export interface WrittenExamGetRes {
    _id: string;
    questions: string[];
    answers: string[];
    exam_num: number;
    userId: string;
    score: number;
    user: UserGetRes;
    createDate: Date;
}