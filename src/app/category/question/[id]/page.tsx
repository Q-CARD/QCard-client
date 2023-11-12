'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button, Textarea } from '@/components/common';
import { getQuestionById } from '@/api/questions';
import { postAnswers, putAnswer } from '@/api/answers';
import { IQuestionDetail } from '@/types';

/**
 * @description 질문모음 > 개별 질문 페이지 (입력 전)
 */
export default function CategoryQuestionPage({
    params,
}: {
    params: { id: number };
}) {
    const router = useRouter();

    const { register, handleSubmit } = useForm();

    const [questionDetail, setQuestionDetail] = useState<any>();
    const [answerDetail, setAnswerDetail] = useState<any>();

    useEffect(() => {
        loadQuestionDetail();
    }, []);

    // TODO - question,answer 페이지 중복 호출 개선
    const loadQuestionDetail = async () => {
        try {
            const data = await getQuestionById(
                Number(params.id),
                'SORT_RECENT',
            );

            setQuestionDetail(data.question);
            setAnswerDetail(data.answers);
        } catch (e) {}
    };

    const sendAnswer = async (answer: string, type: 'put' | 'post') => {
        const payload = {
            questionId: Number(params.id),
            content: answer,
        };

        try {
            let data;
            switch (type) {
                // 답변 없는 경우
                case 'post':
                    data = await postAnswers(payload);
                    break;
                // 등록된 답변이 있는 경우
                case 'put':
                    data = await putAnswer(answerDetail[0].answerId, answer);
                    break;
            }
            return data;
        } catch (e) {}
    };

    const submitAnswer = ({ answer }: any) => {
        const method = answerDetail ? 'put' : 'post';
        sendAnswer(answer, method);

        router.push(`/category/result/${params.id}`);
    };

    return (
        <div className="w-full py-[6.8rem]">
            <div className="flex flex-col items-center gap-[6rem] break-all">
                <div className="w-[78.8rem] flex text-specialHeading mb-[0.8rem]">
                    <span className="text-blue-primary">Q.&nbsp;</span>
                    <span>{questionDetail?.title}</span>
                </div>
                <Textarea
                    defaultValue={
                        (answerDetail && answerDetail[0]?.content) ?? ''
                    }
                    placeholder="알고 있는 만큼 자세히 작성해 보세요."
                    register={register('answer', { required: true })}
                />
                <Button
                    type="block"
                    title="답변하기"
                    onClick={handleSubmit(submitAnswer)}
                />
            </div>
        </div>
    );
}
