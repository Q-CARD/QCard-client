'use client';

import { useRouter } from 'next/navigation';
import { IoIosArrowForward } from 'react-icons/io';

import { parseCategoryName } from '@/utils/parseData';
import { IQuestion } from '@/types';

interface DailyQuestionCardProps {
    question: IQuestion;
}

export function DailyQuestionCard({ question }: DailyQuestionCardProps) {
    const router = useRouter();

    const { questionId, title, category } = question;

    return (
        <div
            className="w-[86rem] h-[31.6rem] px-[1.6rem] rounded-[2rem] border border-[0.1rem] border-grey-4 cursor-pointer flex items-center justify-end gap-[0.8rem]"
            onClick={() => {
                router.push(`/category/question/${questionId}`);
            }}
        >
            <div className="w-[76.4rem] flex flex-col items-center gap-[2rem] text-center">
                <span className="w-full text-specialHeading text-black break-all">
                    {title}
                </span>
                <div className="w-[8.3rem] h-[2.5rem] text-[1rem] font-semibold leading-[2.5rem] text-white bg-blue-primary rounded-[2rem]">
                    {parseCategoryName(category)}
                </div>
            </div>
            <IoIosArrowForward size={24} color="var(--black)" />
        </div>
    );
}
