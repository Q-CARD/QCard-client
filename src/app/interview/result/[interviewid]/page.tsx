// 모의 면접 모드 결과 페이지
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Accordian } from '@/components/Accordian'; // gpt 답변 Props로 넘기기
import { AiOutlineArrowRight } from 'react-icons/ai';
import { INTERVIEW_RESULT } from '@/constants/dummy';
import { Pagination, PageItem } from '@/components/Pagination';

interface AnswerType {
    question_id: number;
    question: string;
    answer: string;
    gpt_answer: string;
    additional_question_1: string;
    additional_question_2: string;
    additional_question_3: string;
}

// answer: 현재 답변 번호 (1~10 사이의 값)
// answer는 다음 답변으로 넘어갈 때마다 1씩 증가함

export default function InterviewResultPage() {
    // intervisewId를 가지고 결과 보기 요청
    // GET /interviews/:interviewId/result

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const router = useRouter();

    const interviewId = searchParams?.get('interviewid') ?? 1;
    const answer = parseInt(searchParams?.get('answer') ?? '1');

    const [curPageResult, setCurPageResult] = useState<AnswerType>();

    const handlePageResult = () => {
        let curPage: AnswerType = INTERVIEW_RESULT.find(
            (el) => el.question_id === answer,
        ) as AnswerType;

        if (curPage) setCurPageResult(curPage);
        // 마지막 질문이거나 없는 경우
        else alert('질문 없음!');
    };

    useEffect(() => {
        handlePageResult();
    }, [answer]);

    const handleNextQuestion = () => {
        if (answer < 10) {
            const pathname = `/interview/result/${interviewId}?answer=${
                Number(answer) + 1
            }`;
            router.push(pathname);
            // 10까지 온 경우 종료
        } else router.push(`/interview/finish`);
    };

    const handleFollowupQuestion = () => {
        const pathname = `/interview/followup/${interviewId}?answer=${answer}`;
        router.push(pathname);
    };

    const NEXT_BUTTON_TEXT = answer < 10 ? '다음 질문으로' : '모의 면접 종료';

    const handlePageMove = (answer: number) => {
        console.log('handlePageMove 실행');
        const pathname = `/interview/result/${interviewId}?answer=${answer}`;
        router.push(pathname);
    };

    const handlePrev = () => {
        if (answer > 1) {
            const pathname = `/interview/result/${interviewId}?answer=${
                answer - 1
            }`;
            router.push(pathname);
        }
    };

    const handleNext = () => {
        if (answer < 10) {
            const pathname = `/interview/result/${interviewId}?answer=${
                answer + 1
            }`;
            router.push(pathname);
        }
    };

    return (
        <section className="flex flex-col items-center min-w-[82rem] m-auto">
            {/* TODO: 카테고리도 필요함 */}
            <div className="flex flex-col items-center rounded-2xl border border-grey-4 py-[4rem] px-[4.8rem] gap-[3.2rem] self-stretch">
                <div className="text-heading3 text-blue-primary">
                    {curPageResult?.question_id}
                </div>
                <h1 className="text-specialHeading">
                    {curPageResult?.question}
                </h1>
                <div className="rounded-[2rem] py-[2px] px-[13px] bg-blue-primary text-white text-bodyExtraSmaller">
                    네트워크
                </div>
                <div className="text-bodyDefault text-grey-6 mt-[2.2rem]">
                    {curPageResult?.answer}
                </div>
                <Accordian
                    className="w-full"
                    gptAnswer={curPageResult?.gpt_answer}
                />
                <button
                    onClick={handleFollowupQuestion}
                    className="flex justify-center items-center w-full py-[2.4rem] px-[3.6rem] text-heading5 rounded-3xl bg-blue-primary text-white"
                >
                    꼬리질문으로 가기
                    <AiOutlineArrowRight
                        size="18"
                        color="var(--white)"
                        className="ml-[0.8rem]"
                    />
                </button>
            </div>
            <Pagination
                handlePrev={handlePrev}
                handleNext={handleNext}
                className="mt-[3.4rem]"
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, idx) => (
                    <PageItem
                        key={`page-item-${idx}`}
                        handlePageMove={handlePageMove}
                        pageIndex={idx + 1}
                        activeIdx={answer}
                    />
                ))}
            </Pagination>
            <button
                onClick={handleNextQuestion}
                className="flex gap-[8px] rounded-[4.7rem] border border-grey-4 items-center mt-[9rem] text-grey-4 py-[2rem] px-[5.6rem] text-bodyDefault"
            >
                {NEXT_BUTTON_TEXT}
                <AiOutlineArrowRight size={15} color="var(--grey-4)" />
            </button>
        </section>
    );
}
