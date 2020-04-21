export interface AnswerGetRes {
    _id: string;
    parent_question: string;
    answer: string;
    point: number;
    answer_img: string;
}

export interface AnswerPostReq {
    answer: string;
    point: number;
    parent_question: string;
    answer_img?: File;
}

export interface AnswerPutReq {
    answer: string;
    point: number;
}

export interface AnswerPutRes {
    message: string;
}

export interface AnswerDeleteRes {
    message: string;
}