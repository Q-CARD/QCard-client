'use client';

import { useRouter } from 'next/navigation';

import { IQuestion } from '@/types';
import { Button } from '@/components/common';

interface DailyQuestionCardProps {
    question: IQuestion;
}

export function DailyQuestionCard({ question }: DailyQuestionCardProps) {
    const router = useRouter();

    return (
        <div
            className="w-[93rem] h-[42.2rem] py-[10rem] px-[13.6rem] rounded-[1rem] bg-white cursor-pointer flex flex-col items-center gap-[10rem]"
            onClick={() => {
                router.push(`/category/question/${question?.questionId}`);
            }}
        >
            <div className="w-[76.4rem] flex flex-col items-center gap-[10rem] text-center">
                <span className="w-full text-heading2 text-black break-all">
                    {question?.title}
                </span>
                <Button type="long" title="답변하기" />
            </div>
        </div>
    );
}
