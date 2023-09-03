// 모의 면접 모드 결과 페이지
import { Suspense } from 'react';
import { headers } from 'next/headers';

import { Accordian } from '@/components/Accordian'; // gpt 답변 Props로 넘기기
import { Pagination } from '@/components/Pagination';
import MarkdownRenderer from '@/components/Markdown';
import NextButton from '@/components/interview/NextButton';
import FollowupButton from '@/components/interview/FollowupButton';
import Question from '@/components/interview/Question';

import { getInterviewAll } from '@/api/interview';

export default async function InterviewResultPage() {
    const headerList = headers();

    //read the custom x-url header
    const header_url_fullUrl = headerList.get('referer') || '';

    // 서버 컴포넌트여서 useParams 사용 불가 => headerList.referer로 요청 URL 접근
    const interview_question_id = header_url_fullUrl
        .split('=')?.[1]
        ?.split('&')?.[0];

    let data = await getInterviewAll(parseInt(interview_question_id));

    return (
        <>
            <div className="flex text-center flex-col w-[85rem] items-center rounded-2xl border border-grey-4 py-[4rem] px-[4.8rem] gap-[3.2rem] self-stretch">
                <Question />
                <Suspense fallback={<p>Loading feed...</p>}>
                    <Accordian
                        rerenderProps={interview_question_id}
                        className="w-full"
                    >
                        <MarkdownRenderer
                            content={
                                data.gpt_answer ??
                                'gpt 답변이 없습니다 다시 한번 녹음해주세요 :)'
                            }
                        />
                    </Accordian>
                </Suspense>
                <FollowupButton />
            </div>
            <Pagination className="mt-[3.4rem]" />
            <NextButton />
        </>
    );
}
