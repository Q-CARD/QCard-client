import { StaticImageData } from 'next/image';
export interface Test {
    id: number;
}

// 카테고리 선택 후, 유저 정보 + 질문들 정보 + interview_id 반환
export interface IUserInterview {
    account: {
        email: string;
        id: number;
        name: string;
    };
    interview_id: number;
    question: IAnswerInterview[];
}

export interface IAnswerInterview {
    additonal_answer_1: null;
    additional_answer_2: null;
    additional_answer_3: null; // TODO: null 맞는지 확인
    additional_question_1: string;
    additional_question_2: string;
    additional_question_3: string;
    answer: string | null;
    gpt_answer: string | null;
    id: number;
    interview: number;
    question: number;
    question_model: IQuestionInterview;
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

export interface IQuestionInterview {
    category: string;
    id: number;
    title: string;
}
