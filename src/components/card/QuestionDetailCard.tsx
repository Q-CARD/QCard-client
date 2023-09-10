'use client';

import { useRouter } from 'next/navigation';

import { IQuestion } from '@/types';
import { GrNext } from 'react-icons/gr';
import { getQuestion } from '@/api/question';

interface QuestionDetailCardProps {
    questionInfo: IQuestion;
}

export function QuestionDetailCard({ questionInfo }: QuestionDetailCardProps) {
    const router = useRouter();

    // TODO - 함수명 변경 검토
    const checkIsAnswered = async () => {
        try {
            const data = await getQuestion(questionInfo.questionId);

            const isMine =
                data.answers.filter((answer: any) => {
                    return answer.isMine;
                }).length > 0;

            return isMine;
        } catch (e) {}
    };

    // TODO - 추후 api 요청
    const moveTo = async () => {
        const isAnswered = await checkIsAnswered();

        const pathname = isAnswered
            ? `/category/result/${questionInfo.questionId}`
            : `/category/question/${questionInfo.questionId}`;

        router.push(pathname);
    };

    return (
        <div
            className="w-[89rem] h-[11.8rem] p-[2rem] rounded-[2rem] border-[0.1rem] border-grey-4 flex items-center cursor-pointer"
            onClick={moveTo}
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
