'use client';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useRouter, useSearchParams } from 'next/navigation';
import { interviewIdAtom } from '@/store/recoil';
import { useRecoilValue } from 'recoil';

interface PaginatinProps {
    children?: React.ReactNode;
    className: string;
}

export function Pagination({ children, className }: PaginatinProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const interviewId = searchParams?.get('interviewid') ?? 1;
    const answer = parseInt(searchParams?.get('answer') ?? '1');
    const obj = useRecoilValue(interviewIdAtom);

    const handlePrev = () => {
        if (answer > 1) {
            const pathname = `/interview/result?id=${obj[answer]}&answer=${
                answer - 1
            }`;
            router.push(pathname);
        }
    };

    const handleNext = () => {
        let pathname = '';
        console.log('answer', answer);
        if (answer < 10) {
            pathname = `/interview/result?id=${obj[answer]}&answer=${
                answer + 1
            }`;
        } else if (answer == 10) {
            pathname = '/interview/finish';
        }
        router.push(pathname);
    };

    const handlePageMove = (answer: number) => {
        const pathname = `/interview/result?id=${obj[answer]}&answer=${answer}`;
        router.push(pathname);
    };

    return (
        <div className={`flex items-center gap-[1.4rem] ${className}`}>
            <AiOutlineArrowLeft
                onClick={handlePrev}
                size="18"
                color="var(--grey-6)"
                className="cursor-pointer"
            />

            <div className={`flex gap-[1.4rem]`}>
                {' '}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, idx) => (
                    <PageItem
                        key={`page-item-${idx}`}
                        handlePageMove={handlePageMove}
                        pageIndex={idx + 1}
                        activeIdx={answer}
                    />
                ))}
            </div>
            <AiOutlineArrowRight
                onClick={handleNext}
                size="18"
                color="var(--grey-6)"
                className="cursor-pointer"
            />
        </div>
    );
}

interface PageItemProps {
    pageIndex: number;
    handlePageMove: (answer: number) => void;
    activeIdx: number; // 현재 활성화된 페이지 인덱스
}

export function PageItem({
    pageIndex,
    handlePageMove,
    activeIdx,
}: PageItemProps) {
    // 현재 페이지이면

    const getClassName = (activeIdx: number) => {
        // 현재 활성 페이지인 경우
        if (pageIndex === activeIdx)
            return 'text-blue-primary bg-blue-2 rounded-xl cursor-pointer';
        // 현재 활성 페이지 이전 페이지 (지나간 페이지의 경우)
        if (pageIndex < activeIdx) return 'text-blue-primary cursor-pointer';
        // 아직 방문 안한 페이지인 경우
        return 'text-grey-4';
    };
    return (
        <span
            className={`flex justify-center items-baseline w-[3.3rem] h-[3.3rem] text-bodyLarge ${getClassName(
                activeIdx,
            )}`}
            onClick={() => handlePageMove(pageIndex)}
        >
            {pageIndex}
        </span>
    );
}
