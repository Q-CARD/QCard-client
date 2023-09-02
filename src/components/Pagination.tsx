import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';

interface PaginatinProps {
    children: React.ReactNode;
    className: string;
    handlePrev: () => any; // 이전버튼 눌렀을 때 작동할 함수
    handleNext: () => any; // 다음버튼 눌렀을 때 작동할 함수
}

// 가운데 버튼들 눌렀을 때 해당 번호 url로 이동
// - url: /interview/result/{interviewId}?answer={children}
export function Pagination({
    children,
    className,
    handlePrev,
    handleNext,
}: PaginatinProps) {
    return (
        <div className={`flex items-center gap-[1.4rem] ${className}`}>
            <AiOutlineArrowLeft
                onClick={handlePrev}
                size="18"
                color="var(--grey-6)"
            >
                이전
            </AiOutlineArrowLeft>

            <div className={`flex gap-[1.4rem]`}>{children}</div>
            <AiOutlineArrowRight
                onClick={handleNext}
                size="18"
                color="var(--grey-6)"
            >
                다음
            </AiOutlineArrowRight>
        </div>
    );
}

interface PageItemProps {
    pageIndex: number;
    handlePageMove: (answer: number) => any;
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
