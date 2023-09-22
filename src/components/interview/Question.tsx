'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { getInterviewAll } from '@/api/interview';
import { useRecoilValue } from 'recoil';
import { interviewListAtom } from '@/store/recoil';
import { categoryKeyToName } from '@/utils/utils';
import { IAnswerInterview } from '@/types';

export default function Question() {
    const searchParams = useSearchParams();
    const answer = parseInt(searchParams?.get('answer') ?? '1');

    const [curPageResult, setCurPageResult] = useState<IAnswerInterview>();

    const interviewQuestion = useRecoilValue(interviewListAtom);

    const DEFAULT_KEY = 'DEFAULT_KEY';

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
            <div className="text-heading3 text-blue-primary">{answer}</div>
            <h1 className="flex justify-center text-center text-specialHeading  w-3/5 break-keep">
                {curPageResult?.question_model?.title}
            </h1>
            <div className="rounded-[2rem] mt-[1rem] py-[2px] px-[13px] bg-blue-primary text-white text-bodyExtraSmaller">
                {categoryKeyToName(
                    curPageResult?.question_model?.category ?? DEFAULT_KEY,
                )}
            </div>
            <div className="text-bodyDefault min-h-[3rem] text-grey-6 mt-[2.2rem]">
                {curPageResult?.answer ?? '내가 녹음한 답변이 없습니다'}
            </div>
        </>
    );
}
