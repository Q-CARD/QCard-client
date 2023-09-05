// 모의 면접 모드 꼬리질문 페이지 interview/followup/:id
'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import ChatRoom from '@/components/chat/ChatRoom';
import { INTERVIEW_RESULT } from '@/constants/dummy';
import { AnswerType } from '@/types/index';
import { interviewIdAtom } from '@/utils/atom';
import { getInterviewAll } from '@/api/interview';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';

export default function InterviewFollowupPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const interviewId = searchParams?.get('id') ?? '1';
    const answer = parseInt(searchParams?.get('answer') ?? '1');

    const [curPageQuestion, setCurPageQuestion] = React.useState<any>();
    const [answerCnt, setAnswerCnt] = React.useState<number>(0); // 답변 횟수 카운트

    const obj = useRecoilValue(interviewIdAtom);

    const getAllInterviewInfo = async () => {
        let data = await getInterviewAll(parseInt(interviewId));
        if (data) {
            setCurPageQuestion(data);
        }
    };

    const handleAnswerCnt = (answerCnt: number) => setAnswerCnt(answerCnt);

    React.useEffect(() => {
        getAllInterviewInfo();
    }, []);

    return (
        <section className="flex flex-col items-center min-w-[82rem] m-auto">
            <div className="flex flex-col items-center rounded-2xl border border-grey-4 py-[4rem] px-[4.8rem] gap-[3.2rem] self-stretch">
                <div className="text-heading3 text-blue-primary">
                    {answer} - 꼬리질문
                </div>
                <h1 className="text-specialHeading w-3/5 break-keep text-center">
                    {curPageQuestion?.question_model.title}
                </h1>
                <ChatRoom
                    additionalQuestions={curPageQuestion}
                    handleAnswerCnt={handleAnswerCnt}
                />
            </div>

            <button
                disabled={answerCnt < 3 && true}
                className={`${
                    answerCnt === 3
                        ? 'border-blue-primary text-blue-primary'
                        : 'border-grey-4 text-grey-4'
                } flex items-baseline gap-[8px] rounded-[4.7rem] border items-center mt-[9rem] py-[2rem] px-[5.6rem] text-bodyDefault`}
                onClick={() =>
                    router.push(
                        `/interview/result/${interviewId}?id=${obj?.[answer]}&answer=${answer}`,
                    )
                }
            >
                <AiOutlineArrowLeft size={15} />
                {answer}번 질문으로 돌아가기
            </button>
        </section>
    );
}
