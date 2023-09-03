import { GET, POST, PUT } from '@/utils/axios';

// 면접보길 원하는 카테고리 리스트 전송받은 후 인터뷰 id 반환
export const newInterview = async (categoryList: string[]) => {
    return await POST(`/interview/start`, { category: categoryList });
};

// 모의면접의 interview_question_id 당 모든 값을 반환
export const getInterviewAll = async (interviewQuestionId: number) => {
    return await GET(`/interview/all/${interviewQuestionId}`);
};

// 특정 모의면접에서 한가지 질문에 대한 답변 Mp3 파일 전송
export const submitRecordFile = async (
    interview_question_id: number,
    body: any,
) => {
    console.log('녹음 파일 전송');
    return await PUT(`/interview/answer/${interview_question_id}`, body, {
        type: 'record',
    });
};

export const submitAdditionalAnswer = async (body: any) => {
    return await PUT(`/interview/additional`, body);
};
