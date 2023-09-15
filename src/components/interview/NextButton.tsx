'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { interviewIdAtom } from '@/store/recoil';

export default function NextButton() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const interviewId = searchParams?.get('interviewid') ?? 1;
    const answer = parseInt(searchParams?.get('answer') ?? '1');
    const obj = useRecoilValue(interviewIdAtom);

    const handleNextQuestion = () => {
        if (answer < 10) {
            const pathname = `/interview/result?id=${obj[answer] + 1}&answer=${
                Number(answer) + 1
            }`;
            router.push(pathname);
        } else router.push(`/interview/finish`);
    };

    const NEXT_BUTTON_TEXT = answer < 10 ? '다음 질문으로' : '모의 면접 종료';

    return (
        <button
            onClick={handleNextQuestion}
            className="flex gap-[8px] rounded-[4.7rem] border border-grey-4 items-center mt-[9rem] text-grey-4 py-[2rem] px-[5.6rem] text-bodyDefault"
        >
            {NEXT_BUTTON_TEXT}
            <AiOutlineArrowRight size={15} color="var(--grey-4)" />
        </button>
    );
}
