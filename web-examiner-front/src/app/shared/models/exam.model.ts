export interface ExamRes{
    _id: string;
    exam_num: number;
    is_active: boolean;
}

export interface SubmitExam {
    exam_num: number;
    questions: string[];
    answers: string[][];
}