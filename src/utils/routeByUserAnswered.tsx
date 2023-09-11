import { getQuestion } from '@/api/question';

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
        const data = await getQuestion(questionId);

        const isMine =
            data.answers.filter((answer: any) => {
                return answer.isMine;
            }).length > 0;

        return isMine;
    } catch (e) {}
};
