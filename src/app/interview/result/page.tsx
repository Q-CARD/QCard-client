// 모의 면접 모드 결과 페이지
import { Suspense } from 'react';
import { headers } from 'next/headers';

// components
import { Accordian } from '@/components/interview/Accordian';
import { Pagination } from '@/components/interview/Pagination';
import MarkdownRenderer from '@/components/interview/Markdown';
import {
    InterviewQuestionSection,
    FollowupButton,
    QuestionSkeleton,
} from '@/components/interview';

export default async function InterviewResultPage() {
    const headerList = headers();

    //read the custom x-url header
    const header_url_fullUrl = headerList.get('referer') || '';

    const interview_question_id = header_url_fullUrl
        .split('=')?.[1]
        ?.split('&')?.[0];

    return (
        <>
            <div className="relative flex flex-col w-full bg-white items-center px-[4.8rem] py-[5.7rem] gap-[3.2rem] rounded-[1rem]">
                <Suspense fallback={<QuestionSkeleton />}>
                    <InterviewQuestionSection />
                </Suspense>
                <Accordian
                    rerenderProps={interview_question_id}
                    className="w-full"
                >
                    <MarkdownRenderer />
                </Accordian>
            </div>
            <div className="pt-[2rem] w-full">
                <FollowupButton />
            </div>
            <div className="pt-[4rem]">
                <Pagination className="mt-[3.4rem]" />
            </div>
        </>
    );
}
