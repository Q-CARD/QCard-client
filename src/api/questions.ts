import { GET, POST } from '@/utils/axios';

// 특정 모의면접에서 한가지 질문에 대한 답변 Mp3 파일 전송
export const getQuestion = async () => {
    return await GET(`/questions/22`);
};

export const getQuestionMain = async () => {
    return await GET(`/questions/main`);
};
