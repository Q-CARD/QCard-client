// 모의 면접 질문 페이지
'use client';
import { useState, useEffect } from 'react';
import RecordCard from '@/components/card/RecordCard';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { INTERVIEW_QUESTION } from '@/constants/dummy';

// TODO: interviewid를 가지고, GET /interviews/:interview_id 요청

interface QuestionType {
    interview_question_id: number;
    title: string;
}

export default function InterviewQuestionPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Search params
    const interviewId = searchParams?.get('interviewid') ?? 1;
    const question = parseInt(searchParams?.get('question') ?? '1');

    const [curPageQuestion, setCurPageQuestion] = useState<QuestionType>();

    const handleCurQuestion = () => {
        let curQuestion: QuestionType | undefined = INTERVIEW_QUESTION.find(
            (_, idx) => idx + 1 === question, // number
        );
        if (curQuestion) setCurPageQuestion(curQuestion);
        else alert('다음 질문이 없습니다');
    };

    //question이 바뀔 때마다 현재 질문 세팅하기
    useEffect(() => {
        handleCurQuestion();
    }, [question]);

    const handleNextQuestion = () => {
        if (question < 10) {
            const pathname = `/interview/${interviewId}?question=${
                Number(question) + 1
            }`;
            router.push(pathname);
        } else router.push(`/interview/result/${interviewId}?result=1`);
    };

    return (
        <section className="flex flex-col min-w-[82rem] m-auto">
            <RecordCard question={curPageQuestion} />
            <button onClick={handleNextQuestion} className="mt-[5.7rem]">
                다음 질문으로
            </button>
        </section>
    );
}
