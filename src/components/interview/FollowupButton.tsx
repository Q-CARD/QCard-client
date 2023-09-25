'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { AiOutlineRight } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { interviewListAtom } from '@/store/recoil';
import { IAnswerInterview } from '@/types';

export default function FollowupButton() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [interviewQuestionId, setInterviewQuestionId] = useState<number>(0);
    const interviewId = searchParams?.get('interviewid') ?? 1;
    const answer = parseInt(searchParams?.get('answer') ?? '1');

    const interviewQuestion = useRecoilValue(interviewListAtom);

    const handlePageResult = () => {
        let curPage: IAnswerInterview = interviewQuestion?.[answer - 1];
        if (!curPage) {
            alert('질문 없음');
            return;
        }
        setInterviewQuestionId(curPage?.id);
    };

    useEffect(() => {
        handlePageResult();
    }, [answer]);

    // 꼬리질문으로 이동
    const handleFollowupQuestion = () => {
        const pathname = `/interview/followup?id=${interviewQuestionId}&answer=${answer}`;
        router.replace(pathname);
    };

    return (
        <button
            onClick={handleFollowupQuestion}
            className="flex justify-center items-center w-full py-[2.4rem] px-[3.6rem] rounded-[1rem] bg-blue-primary text-white gap-[4px]"
        >
            <span className="text-heading3">꼬리 질문 연습하기</span>
            <AiOutlineRight size={25} />
        </button>
    );
}
