'use client';
import Image from 'next/image';
import { useRef } from 'react';

import ImgHeading from '@/assets/images/image-main-heading.png';
import ImgCardDeck3 from '@/assets/images/image-card-deck-3.png';
import IconArrowDown from '@/assets/icons/icon-arrow-down.png';

interface IntroSectionProps {
    children: React.ReactNode;
}
export default function IntroSection({ children }: IntroSectionProps) {
    const ref = useRef<HTMLElement>(null);

    const handleScrollMove = () => {
        let headerOffset = 112;
        const focusElPos = ref.current?.getBoundingClientRect().top!;
        let offsetPosition = focusElPos + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    };

    return (
        <>
            <section className="bg-main flex flex-col pt-[16.7rem] pb-[9rem] pr-[4.2rem] pl-[16.2rem]">
                <div className="flex justify-between">
                    <div className="flex-col">
                        <Image
                            src={ImgHeading}
                            alt="main-heading"
                            width={541}
                            height={140}
                        />
                        <div className="pt-[4.4rem] text-grey-5 text-specialHeading5 break-keep">
                            다양한 카테고리의 질문으로 이루어진 큐카드와
                            <br />
                            GPT의 모범 답안으로 기술 면접을 준비해요!
                        </div>
                    </div>
                    <div className="mt-[4.1px]">
                        <Image
                            src={ImgCardDeck3}
                            alt="card-deck3"
                            width={615}
                            height={505}
                        />
                    </div>
                </div>
                <Image
                    className="self-center animate-bounce cursor-pointer"
                    onClick={handleScrollMove}
                    src={IconArrowDown}
                    alt="arrow-down"
                    width={107}
                    height={60}
                />
            </section>
            <section
                ref={ref}
                className="flex flex-col bg-blue-1 m-auto pt-[12.6rem] pb-[25.5rem] px-[15.9rem]"
            >
                <h2 className="text-heading2">오늘의 질문</h2>
                <p className="pt-[3rem] text-grey-6 text-specialHeading5">
                    하루에 하나씩, 차근차근 준비해봐요
                </p>
                <div className="mt-[9.9rem] flex justify-center">
                    {children}
                </div>
            </section>
        </>
    );
}
