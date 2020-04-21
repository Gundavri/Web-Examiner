export interface QuestionReq {
    questionIds: string[];
}

export interface QuestionRes {
    question_id: string;
    question: string;
    question_img: string;
    answers: Answer[];
    answersIds: string[];
}

export interface Answer {
    answer: string;
    answer_img: string;
}