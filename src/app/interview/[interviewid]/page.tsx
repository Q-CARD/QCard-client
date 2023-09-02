// 모의 면접 질문 페이지
'use client';
import { useState, useEffect } from 'react';
import RecordCard from '@/components/card/RecordCard';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { INTERVIEW_QUESTION } from '@/constants/dummy';
import { AiOutlineArrowRight } from 'react-icons/ai';

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
            router.replace(pathname);
            // 뒤로가기 누르면 홈으로 이동
        } else router.replace(`/interview/result/${interviewId}?result=1`);
    };

    const NEXT_BUTTON_TEXT = question < 10 ? '다음 질문으로' : '결과 보러가기';

    return (
        <section className="flex items-center flex-col min-w-[82rem] m-auto">
            <RecordCard question={curPageQuestion} />
            <button
                onClick={handleNextQuestion}
                className="w-fit flex items-center mt-[5.7rem] gap-[8px] py-[2.4rem] px-[3.6rem] bg-blue-primary text-specialHeading3 text-white rounded-[3rem]"
            >
                {NEXT_BUTTON_TEXT}
                <AiOutlineArrowRight size={15} color="#fff" />
            </button>
        </section>
    );
}
