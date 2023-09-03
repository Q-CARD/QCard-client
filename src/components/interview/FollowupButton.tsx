'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { interviewListAtom } from '@/utils/atom';

export default function FollowupButton() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [interviewQuestionId, setInterviewQuestionId] = useState<number>(0);
    const interviewId = searchParams?.get('interviewid') ?? 1;
    const answer = parseInt(searchParams?.get('answer') ?? '1');

    const interviewQuestion = useRecoilValue(interviewListAtom);

    const handlePageResult = () => {
        let curPage: any = interviewQuestion?.[answer - 1];
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
        const pathname = `/interview/followup/${interviewId}?answer=${answer}&id=${interviewQuestionId}`;
        router.replace(pathname);
    };

    return (
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
    );
}
