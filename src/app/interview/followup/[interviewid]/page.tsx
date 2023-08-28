// 모의 면접 모드 꼬리질문 페이지 interview/followup/:id
'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ChatRoom from '@/components/chat/ChatRoom';
import { INTERVIEW_RESULT } from '@/constants/data';

interface AnswerType {
    question_id: number;
    question: string;
    answer: string;
    gpt_answer: string;
    additional_question_1: string;
    additional_question_2: string;
    additional_question_3: string;
}

export default function InterviewFollowupPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Search Params
    const interviewId = searchParams?.get('interviewid') ?? 1;
    const answer = searchParams?.get('answer') ?? 1;

    const [curPageQuestion, setCurPageQuestion] = React.useState<AnswerType>();

    // interviewid를 가지고 요청 후, 꼬리질문 state에 저장하는 함수
    const handlePageFollowupQuestion = () => {
        let curPageQuestion = INTERVIEW_RESULT.find(
            (el) => el.question_id == answer,
        );
        setCurPageQuestion(curPageQuestion);
    };

    React.useEffect(() => {
        handlePageFollowupQuestion();
    }, []);

    return (
        <section className="flex flex-col items-center min-w-[82rem] m-auto">
            <div className="flex flex-col items-center rounded-2xl border border-grey-4 py-[4rem] px-[4.8rem] gap-[3.2rem] self-stretch">
                <div className="text-heading3 text-blue-primary">
                    {curPageQuestion?.question_id} - 꼬리질문
                </div>
                <h1 className="text-specialHeading">
                    {curPageQuestion?.question}
                </h1>
                <ChatRoom additionalQuestions={curPageQuestion} />
            </div>
            <button
                onClick={() =>
                    router.push(
                        `/interview/result/${interviewId}?answer=${answer}`,
                    )
                }
            >
                {answer}번 질문으로 돌아가기
            </button>
        </section>
    );
}
