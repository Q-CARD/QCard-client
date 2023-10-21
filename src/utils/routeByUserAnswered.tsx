import { getQuestionById } from '@/api/questions';
import { IAnswerHearted } from '@/types';

/**
 * @description user가 답변한 질문이 아니면 입력 페이지로, 이미 답변한 질문이면 답변 결과 페이지로 이동
 * @param router
 * @param questionId
 */
export const routeByUserAnswered = async (
    router: any,
    questionId: number | string,
) => {
    const isAnswered = await checkIsAnswered(Number(questionId));

    const pathname = isAnswered
        ? `/category/result/${questionId}`
        : `/category/question/${questionId}`;

    router.push(pathname);
};

const checkIsAnswered = async (questionId: number) => {
    try {
        const data = await getQuestionById(questionId, 'SORT_RECENT');

        const isMine = data.answers.some((answer: IAnswerHearted) => {
            return answer.isMine;
        });

        return isMine;
    } catch (e) {}
};
