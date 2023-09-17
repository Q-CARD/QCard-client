// 모의 면접 질문 페이지
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import RecordCard from '@/components/card/RecordCard';
import { IQuestionInterview } from '@/types';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { interviewIdAtom, interviewListAtom } from '@/store/recoil';

export default function InterviewQuestionPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const question = parseInt(searchParams?.get('question') ?? '1');

    const interviewQuestion = useRecoilValue(interviewListAtom);

    const [curPageQuestion, setCurPageQuestion] =
        useState<IQuestionInterview>();
    const [interviewQuestionId, setInterviewQuestionId] = useState<number>(1);

    const handleCurQuestion = () => {
        let curQuestion: IQuestionInterview =
            interviewQuestion?.[question - 1]?.['question_model'];

        let interviewQuestionId = interviewQuestion?.[question - 1]?.['id'];
        if (curQuestion) setCurPageQuestion(curQuestion);
        if (interviewQuestionId) setInterviewQuestionId(interviewQuestionId);
        else alert('다음 질문이 없습니다');
    };

    const [disabled, setDisabled] = useState(true);

    // question이 바뀔 때마다 현재 질문 세팅하기
    useEffect(() => {
        handleCurQuestion();
    }, [question]);

    const firstInterviewId = useRecoilValue(interviewIdAtom);

    const handleNextQuestion = () => {
        if (question < 10) {
            const pathname = `/interview/question?question=${
                Number(question) + 1
            }`;
            router.replace(pathname);
            // 뒤로가기 누르면 홈으로 이동
        } else
            router.replace(
                `/interview/result?id=${firstInterviewId[1]}&answer=1`,
            );
    };

    const NEXT_BUTTON_TEXT = question < 10 ? '다음 질문으로' : '결과 보러가기';

    const getRecordingStatus = (isRecording: boolean | null) => {
        if (typeof isRecording === 'boolean' && isRecording == false) {
            setDisabled(false);
        } else if (typeof isRecording === 'object') {
            // null 타입
            setDisabled(true);
        }
    };

    return (
        <section className="flex items-center flex-col min-w-[82rem] m-auto">
            <RecordCard
                getRecordingStatus={getRecordingStatus}
                interviewQuestionId={interviewQuestionId}
                cnt={question}
                question={curPageQuestion}
            />
            <button
                disabled={disabled}
                onClick={handleNextQuestion}
                className={`${
                    disabled
                        ? 'bg-grey-3 text-grey-6'
                        : 'bg-blue-primary text-white'
                } w-full flex justify-center items-center mt-[3.5rem] gap-[8px] py-[2.4rem] px-[3.6rem] text-specialHeading3 rounded-[1rem]`}
            >
                {NEXT_BUTTON_TEXT}
                <AiOutlineArrowRight
                    size={15}
                    color={`${disabled ? 'var(--grey-4)' : '#fff'}`}
                />
            </button>
        </section>
    );
}
