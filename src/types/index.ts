import { StaticImageData } from 'next/image';
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

export interface IAnswer {
    question: IQuestion;
    answerId: number;
    type: string;
    account: {
        name: string;
        email: string;
    };
    content: string;
    heartCount: number;
    createdAt: string; // string / Date
    modifiedAt: string; // string / Date
}

export interface IAnswerHearted extends IAnswer {
    isHearted: boolean;
    isMine: boolean;
}

export interface IGptAnswer {
    answerId: number;
    type: string;
    account: null;
    content: string;
    heartCount: null;
    createdAt: null;
    modifiedAt: null;
    isHearted: null;
    isMine: null;
}

export interface ICategory {
    id: number;
    name: string;
    image: StaticImageData;
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

export interface IQuestionDetail {
    question: IQuestion;
    gpt: IGptAnswer;
    answers: IAnswerHearted[];
}
