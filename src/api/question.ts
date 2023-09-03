import { GET } from '@/utils/axios';

// category에 해당하는 질문리스트 반환
export const getQuestionsCategory = async (category: string) => {
    return await GET(`/questions/categories/${category}`);
};

// 특정 질문 상세정보 반환
export const getQuestion = async (questionId: number) => {
    return await GET(`/questions/${questionId}`);
};

// 메인 화면에 사용되는 Question 반환
export const getQuestionsMain = async () => {
    return await GET(`/questions/main`);
};
