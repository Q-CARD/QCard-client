'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { useRecoilValue } from 'recoil';
import { interviewListAtom } from '@/utils/atom';
import { getInterviewAll } from '@/api/interview';
import { categoryKeyToName } from '@/utils/utils';

interface AnswerType {
    question_id: number;
    question: number;
    id: number;
    interview: number;
    answer: string;
    gpt_answer: string;
    additional_question_1: string;
    additional_question_2: string;
    additional_question_3: string;
    additional_answer_1: string;
    additional_answer_2: string;
    additional_answer_3: string;
    question_model: any;
}

export default function Question() {
    const searchParams = useSearchParams();

    const answer = parseInt(searchParams?.get('answer') ?? '1');
    const [curPageResult, setCurPageResult] = useState<AnswerType>();

    const interviewQuestion = useRecoilValue(interviewListAtom);

    const getAllInterviewInfo = async (id: number) => {
        let data = await getInterviewAll(id);
        if (data) {
            setCurPageResult(data);
        }
    };

    const handlePageResult = () => {
        let curPage: AnswerType = interviewQuestion?.[answer - 1];
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
            <div className="text-heading3 text-blue-primary">{answer}</div>
            <h1 className="text-specialHeading h-[3.8rem] w-3/5 break-keep">
                {curPageResult?.question_model?.title}
            </h1>
            <div className="rounded-[2rem] mt-[2rem] py-[2px] px-[13px] bg-blue-primary text-white text-bodyExtraSmaller">
                {categoryKeyToName(curPageResult?.question_model?.category)}
            </div>
            <div className="text-bodyDefault h-[3rem] text-grey-6 mt-[2.2rem]">
                {curPageResult?.answer ?? '내가 녹음한 답변이 없습니다'}
            </div>
        </>
    );
}
