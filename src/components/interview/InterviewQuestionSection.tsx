'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getInterviewAll } from '@/api/interview';

export default function InterviewQuestionSection() {
    const searchParams = useSearchParams();
    const answer = parseInt(searchParams?.get('answer') ?? '1');
    const interviewId = parseInt(searchParams.get('id') ?? '1');

    const NO_ANSWER = '내가 녹음한 답변이 없습니다';

    const { data } = useQuery({
        queryKey: ['interviewQuestions', interviewId],
        queryFn: () => getInterviewAll(interviewId),
    });

    return (
        <>
            <div className="flex items-center justify-center absolute top-[-2.8rem] bg-blue-primary w-[5.7rem] h-[5.7rem] rounded-[50%]">
                <span className="text-white text-heading3">{answer}</span>
            </div>
            <h1 className="flex justify-center text-center text-heading3 w-full break-keep">
                {data?.question_model?.title}
            </h1>
            <div className="text-bodyDefault min-h-[3rem] mt-[2.2rem] text-grey-6">
                {data?.answer ?? NO_ANSWER}
            </div>
        </>
    );
}
