'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button, Textarea } from '@/components/common';
import { getQuestionById } from '@/api/questions';
import { postAnswers } from '@/api/answers';
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
        } catch (e) {}
    };

    const sendAnswer = async (answer: string) => {
        const payload = {
            questionId: Number(params.id),
            content: answer,
        };

        try {
            const data = await postAnswers(payload);
        } catch (e) {}
    };

    const submitAnswer = ({ answer }: any) => {
        sendAnswer(answer);

        router.push(`/category/result/${params.id}`);
    };

    return (
        <div className="my-[6.8rem] flex flex-col items-center gap-[6rem] break-all">
            <div className="w-[78.8rem] flex text-specialHeading mb-[0.8rem]">
                <span className="text-blue-primary">Q.&nbsp;</span>
                <span>{questionDetail?.title}</span>
            </div>
            <Textarea
                placeholder="알고 있는 만큼 자세히 작성해 보세요."
                register={register('answer', { required: true })}
            />
            <Button
                type="block"
                title="답변하기"
                onClick={handleSubmit(submitAnswer)}
            />
        </div>
    );
}
