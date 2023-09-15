'use client';

import { useRouter } from 'next/navigation';

import { routeByUserAnswered } from '@/utils/routeByUserAnswered';
import { IQuestion } from '@/types';
import { GrNext } from 'react-icons/gr';

interface QuestionDetailCardProps {
    questionInfo: IQuestion;
}

export function QuestionDetailCard({ questionInfo }: QuestionDetailCardProps) {
    const router = useRouter();

    return (
        <div
            className="w-[89rem] h-[11.8rem] p-[2rem] rounded-[2rem] border-[0.1rem] border-grey-4 flex items-center cursor-pointer"
            onClick={() => routeByUserAnswered(router, questionInfo.questionId)}
        >
            <span className="w-[77.8rem] ml-[4rem] text-center text-specialHeading text-black">
                {questionInfo.title}
            </span>
            <div className="ml-auto mr-0">
                <GrNext size="24" color="var(--black)" />
            </div>
        </div>
    );
}
