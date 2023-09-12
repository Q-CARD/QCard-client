export interface Test {
    id: number;
}

export interface AnswerType {
    question_id: number;
    question: string;
    answer: string;
    gpt_answer: string;
    id: number;
    additional_question_1: string;
    additional_question_2: string;
    additional_question_3: string;
}

export interface ICategory {
    id: number;
    name: string;
    image: any; // TODO - any
}

export interface IQuestion {
    questionId: number;
    title: string;
    category: string;
}

export interface IQuestionMain {
    questionZip: {
        category: string;
        questions: IQuestion[];
    };
    questionDaily: IQuestion;
}
