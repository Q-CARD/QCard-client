'use client';

import { useRouter } from 'next/navigation';

import { routeByUserAnswered } from '@/utils/routeByUserAnswered';
import { IQuestion } from '@/types';
import { BsChevronRight } from 'react-icons/bs';

interface QuestionDetailCardProps {
    questionInfo: IQuestion;
}

/**
 *
 * @description 카테고리 별 질문 카드
 */
export function QuestionDetailCard({ questionInfo }: QuestionDetailCardProps) {
    const router = useRouter();

    return (
        <div
            className="w-[93rem] h-[11.8rem] px-[2.6rem] py-[3rem] flex justify-between items-center gap-[1.5rem] cursor-pointer"
            onClick={() => routeByUserAnswered(router, questionInfo.questionId)}
        >
            <span className="text-black text-heading3">
                {questionInfo.title}
            </span>
            <BsChevronRight size="24" color="var(--grey-6)" />
        </div>
    );
}
