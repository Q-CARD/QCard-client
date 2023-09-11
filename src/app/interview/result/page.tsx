// 모의 면접 모드 결과 페이지
import { Suspense } from 'react';
import { headers } from 'next/headers';

// components
import { Accordian } from '@/components/Accordian';
import { Pagination } from '@/components/Pagination';
import MarkdownRenderer from '@/components/Markdown';
import {
    Question,
    FollowupButton,
    NextButton,
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
            <div className="flex flex-col w-[85rem] items-center py-[4rem] rounded-2xl border border-grey-4 text-center px-[4.8rem] gap-[3.2rem] self-stretch">
                <Suspense fallback={<QuestionSkeleton />}>
                    <Question />
                </Suspense>
                <Accordian
                    rerenderProps={interview_question_id}
                    className="w-full"
                >
                    <MarkdownRenderer />
                </Accordian>
                <FollowupButton />
            </div>
            <Pagination className="mt-[3.4rem]" />
            <NextButton />
        </>
    );
}
