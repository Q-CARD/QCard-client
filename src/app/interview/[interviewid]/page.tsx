// 모의 면접 질문 페이지
'use client';
import { useState, useEffect } from 'react';
import RecordCard from '@/components/card/RecordCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { interviewIdAtom, interviewListAtom } from '@/utils/atom';

interface QuestionType {
    category: string; // "CATEGORY_NW"
    id: number; // question_id
    title: string;
}

export default function InterviewQuestionPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // interview question
    const interviewQuestion = useRecoilValue(interviewListAtom);

    let interviewId = 1;
    const question = parseInt(searchParams?.get('question') ?? '1');

    const [curPageQuestion, setCurPageQuestion] = useState<QuestionType>();
    const [interviewQuestionId, setInterviewQuestionId] = useState<number>(1);

    const handleCurQuestion = () => {
        // question
        let curQuestion: QuestionType =
            interviewQuestion?.[question - 1]?.['question_model'];

        let interviewQuestionId = interviewQuestion?.[question - 1]?.['id'];
        if (curQuestion) setCurPageQuestion(curQuestion);
        if (interviewQuestionId) setInterviewQuestionId(interviewQuestionId);
        else alert('다음 질문이 없습니다');
    };

    //question이 바뀔 때마다 현재 질문 세팅하기
    useEffect(() => {
        handleCurQuestion();
    }, [question]);

    const obj = useRecoilValue(interviewIdAtom);
    console.log('[obj]', obj); // [ empty, 22 ,23, 24, ...]

    const handleNextQuestion = () => {
        if (question < 10) {
            const pathname = `/interview/${interviewId}?question=${
                Number(question) + 1
            }`;
            router.replace(pathname);
            // 뒤로가기 누르면 홈으로 이동
        } else
            router.replace(
                `/interview/result/${interviewId}?id=${obj[1]}&answer=1`,
            );
    };

    const NEXT_BUTTON_TEXT = question < 10 ? '다음 질문으로' : '결과 보러가기';

    return (
        <section className="flex items-center flex-col min-w-[82rem] m-auto">
            <RecordCard
                interviewQuestionId={interviewQuestionId}
                cnt={question}
                question={curPageQuestion}
            />
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
