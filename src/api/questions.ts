import { http } from '@/utils/fetch';

// category에 해당하는 질문리스트 반환 - 클라이언트
export const getQuestionsCategory = async (category: string) => {
    return await http.GET(`/questions/categories/${category}`);
};

// 특정 질문 상세정보 반환 (정렬) - 클라이언트
export const getQuestionById = async (
    questionId: number,
    sort?: 'SORT_HEART' | 'SORT_RECENT',
) => {
    return await http.GET(`/questions/${questionId}`, { sort: sort });
};

// 메인 화면에 사용되는 Question 반환 - 서버
export const getQuestionsMain = async () => {
    return (await fetch('https://api.qcard.co.kr/questions/main')).json();
};

// question을 검색하여 관련 데이터를 반환 - 클라이언트
export const getQuestions = async (
    category?: string,
    type?: 'TYPE_QCARD' | 'TYPE_CUSTOM',
    mine?: boolean,
    size?: number,
    page?: number,
) => {
    return await http.GET(`/questions`, {
        category: category,
        type: type,
        mine: mine,
        size: size,
        page: page,
    });
};

// 커스텀 질문 생성 - 클라이언트
export const postQuestion = async (payload: {
    title: string;
    category: string;
}) => {
    return await http.POST(`/questions`, payload);
};
