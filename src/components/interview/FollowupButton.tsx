'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { AiOutlineRight } from 'react-icons/ai';

export default function FollowupButton() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const answer = parseInt(searchParams?.get('answer') ?? '1');
    const interviewId = parseInt(searchParams.get('id') ?? '1');

    // 꼬리질문으로 이동
    const handleFollowupQuestion = () => {
        const pathname = `/interview/followup?id=${interviewId}&answer=${answer}`;
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
