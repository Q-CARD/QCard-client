import { http } from '@/utils/fetch';

// category에 해당하는 질문리스트 반환
export const getQuestionsCategory = async (category: string) => {
    return await http.GET(`/questions/categories/${category}`);
};

// 특정 질문 상세정보 반환
export const getQuestion = async (questionId: number) => {
    return await http.GET(`/questions/${questionId}`);
};

// 메인 화면에 사용되는 Question 반환
export const getQuestionsMain = async () => {
    return await http.GET(`/questions/main`);
};

// 내가 쓴 질문 리스트 반환
export const getQuestionsMe = async (param: string) => {
    return await http.GET(`/questions`, {
        category: param,
        type: 'TYPE_CUSTOM',
        mine: true,
        size: 100, // 페이지네이션 적용
    });
};
