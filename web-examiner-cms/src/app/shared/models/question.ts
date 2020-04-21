export interface QuestionGetRes {
    _id: string;
    parent_exam_num: number;
    question: string;
    question_img: string;
    answers: string[];
}

export interface QuestionDeleteRes {
    message: string;
}

export interface QuestionPostPutReq {
    parent_exam_num?: number;
    question: string;
    question_img?: string | File;
}

export interface QuestionPutRes {
    message: string;
}