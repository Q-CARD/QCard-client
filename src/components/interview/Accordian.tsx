'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

interface AccordianProps {
    className: string;
    children: React.ReactNode;
}

export function Accordian({ className, children }: AccordianProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const searchParams = useSearchParams();
    const interviewId = searchParams.get('id') ?? '1';

    const handleAccordianOpen = () => {
        setIsOpen(!isOpen);
    };
    // 아코디언 열리는 애니메이션: animate__animated animate__slideInDown

    React.useEffect(() => {
        setIsOpen(false);
    }, [interviewId]);
    return (
        <div
            className={`${className} flex flex-col justify-center items-center w-full py-[2.4rem] px-[3.6rem] border border-[2px] border-yellow-3 min-h-[7.9rem] rounded-3xl bg-yellow-1`}
        >
            <div className="w-full text-bodySmaller">
                <AccordianTrigger
                    isOpen={isOpen}
                    handleAccordianOpen={handleAccordianOpen}
                />
                <AccordianContent isOpen={isOpen} value={''}>
                    {children}
                </AccordianContent>
            </div>
        </div>
    );
}
interface AccordianTriggerProps {
    isOpen: boolean;
    handleAccordianOpen: () => void;
}
// 아코디언 안에 들어가는 아이템
export function AccordianTrigger({
    isOpen,
    handleAccordianOpen,
}: AccordianTriggerProps) {
    return (
        <button
            className="flex justify-center items-center w-full text-heading3 bg-yellow-1"
            onClick={() => handleAccordianOpen()}
        >
            GPT 첨삭 확인하기
            {isOpen ? (
                <MdKeyboardArrowUp
                    size="28"
                    color="var(--grey-5)"
                    className="ml-[0.8rem]"
                />
            ) : (
                <MdKeyboardArrowDown
                    size="28"
                    color="var(--grey-5)"
                    className="ml-[0.8rem]"
                />
            )}
        </button>
    );
}

interface AccordianContentProps {
    value: string | undefined;
    isOpen: boolean;
    children: React.ReactNode;
}
export function AccordianContent({
    value,
    isOpen,
    children,
    ...props
}: AccordianContentProps) {
    return (
        <div
            className={`${
                isOpen ? 'block' : 'hidden'
            } self-stretch text-left text-bodyDefault pt-[3.3rem]`}
        >
            {children}
        </div>
    );
}
