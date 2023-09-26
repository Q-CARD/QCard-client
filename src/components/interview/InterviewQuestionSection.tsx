'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { getInterviewAll } from '@/api/interview';
import { useRecoilValue } from 'recoil';
import { interviewListAtom } from '@/store/recoil';
import { IAnswerInterview } from '@/types';

export default function InterviewQuestionSection() {
    const searchParams = useSearchParams();
    const answer = parseInt(searchParams?.get('answer') ?? '1');

    const NO_ANSWER = '내가 녹음한 답변이 없습니다';

    const [curPageResult, setCurPageResult] = useState<IAnswerInterview>();
    const interviewQuestion = useRecoilValue(interviewListAtom);

    const getAllInterviewInfo = async (id: number) => {
        let data = await getInterviewAll(id);
        if (data) {
            setCurPageResult(data);
        }
    };

    const handlePageResult = () => {
        let curPage: IAnswerInterview = interviewQuestion?.[answer - 1];
        if (!curPage) {
            alert('질문 없음');
            return;
        }
        getAllInterviewInfo(curPage?.id);
    };

    useEffect(() => {
        handlePageResult();
    }, [answer]);

    return (
        <>
            <div className="flex items-center justify-center absolute top-[-2.8rem] bg-blue-primary w-[5.7rem] h-[5.7rem] rounded-[50%]">
                <span className="text-white text-heading3">{answer}</span>
            </div>
            <h1 className="flex justify-center text-center text-heading3 w-full break-keep">
                {curPageResult?.question_model?.title}
            </h1>
            <div className="text-bodyDefault min-h-[3rem] mt-[2.2rem] text-grey-6">
                {curPageResult?.answer ?? NO_ANSWER}
            </div>
        </>
    );
}
