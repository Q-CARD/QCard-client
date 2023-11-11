import { http } from '@/utils/fetch';

// 답변 기록 - 클라이언트
export const postAnswers = async (payload: any) => {
    return await http.POST(`/answers`, payload);
};

// 내가 쓴 답변 리스트 반환 - 클라이언트
export const getAnswersMe = async (param: string) => {
    return await http.GET(`/answers/me`, { category: param });
};

// 특정 답변에 대한 수정 전송 - 안쓰임
export const putAnswer = async (answerId: number, content: string) => {
    return await http.PUT(`/answers/${answerId}`, { content: content });
};
