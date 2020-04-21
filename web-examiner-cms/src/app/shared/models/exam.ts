export interface ExamGetRes {
    _id: string;
    exam_num: number;
    questions: string[];
    is_active: boolean;
    exam_time: number;
    questions_amount: number;
}

export interface ExamDeleteRes {
    message: string;
}

export interface ExamPostReq {
    exam_num: number;
}

export interface ExamPutReq {
    is_active: boolean;
    exam_time?: number;
    questions_amount?: number;
}

export interface ExamPutRes {
    message: string;
}