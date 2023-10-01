// 모의 면접 모드 결과 페이지
import { Suspense } from 'react';

// components
import {
    FollowupButton,
    QuestionSkeleton,
    HydratedInterviewQuestion,
    Accordian,
    Pagination,
    MarkdownRenderer,
} from '@/components/interview';

export default async function InterviewResultPage() {
    return (
        <>
            <div className="relative flex flex-col w-full bg-white items-center px-[4.8rem] py-[5.7rem] gap-[3.2rem] rounded-[1rem]">
                <Suspense fallback={<QuestionSkeleton />}>
                    <HydratedInterviewQuestion />
                </Suspense>
                <Accordian className="w-full">
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
