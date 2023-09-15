// 질문 상세 페이지_입력 전
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/Button';
import { Textarea } from '@/components/Textarea';
import { getQuestion } from '@/api/question';
import { postAnswers } from '@/api/answer';
import { IQuestionDetail } from '@/types';

export default function CategoryQuestionPage({
    params,
}: {
    params: { id: number };
}) {
    const router = useRouter();

    const { register, handleSubmit } = useForm();

    const [questionDetail, setQuestionDetail] = useState<
        IQuestionDetail | undefined
    >();

    useEffect(() => {
        loadQuestionDetail();
    }, []);

    // TODO - question,answer 페이지 중복 호출 개선
    const loadQuestionDetail = async () => {
        try {
            const data = await getQuestion(Number(params.id));

            setQuestionDetail(data);
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
        <div className="my-[12.8rem] flex flex-col items-center gap-[3.2rem]">
            <div className="text-specialHeading mb-[0.8rem]">
                <span className="text-blue-primary">Q. </span>
                <span>{questionDetail?.question?.title}</span>
            </div>
            <Textarea
                placeholder="자세히 입력할 수록 좋아요"
                register={register('answer', { required: true })}
            />
            <Button
                type="block"
                title="등록하기"
                onClick={handleSubmit(submitAnswer)}
            />
        </div>
    );
}
