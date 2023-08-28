'use client';
import React from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

interface AccordianProps {
    gptAnswer: string | undefined;
    className: string;
}

export function Accordian({ gptAnswer, className }: AccordianProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleAccordianOpen = () => {
        setIsOpen(!isOpen);
    };
    // 아코디언 열리는 애니메이션: animate__animated animate__slideInDown
    return (
        <div
            className={`${className} flex justify-center items-center w-full py-[2.4rem] px-[3.6rem] text-bodySmaller border border-grey-4 rounded-3xl bg-white text-grey-5`}
        >
            <AccordianTrigger
                isOpen={isOpen}
                handleAccordianOpen={handleAccordianOpen}
            />
            <AccordianContent isOpen={isOpen} value={gptAnswer} />
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
            className="flex justify-center items-center w-full  text-bodySmaller bg-white text-grey-5"
            onClick={() => handleAccordianOpen()}
        >
            GPT 첨삭 보기
            {isOpen ? (
                <MdKeyboardArrowUp
                    size="18"
                    color="var(--grey-5)"
                    className="ml-[0.8rem]"
                />
            ) : (
                <MdKeyboardArrowDown
                    size="18"
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
}
export function AccordianContent({
    value,
    isOpen,
    ...props
}: AccordianContentProps) {
    return (
        <p
            className={`${
                isOpen ? 'block' : 'hidden'
            } self-stretch text-grey-6 text-bodyDefault pt-[1.6rem] transition-all ease-in-out 0.3s`}
        >
            {value}
        </p>
    );
}
