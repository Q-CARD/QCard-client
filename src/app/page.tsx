import Image from 'next/image';
import { type Metadata } from 'next';
import Link from 'next/link';
import { Footer, Button } from '@/components/common';
import { DailyQuestionCard } from '@/components/card/DailyQuestionCard';

import ImgMainCategory from '@/assets/images/image-main-category.png';
import ImgInterviewIllust from '@/assets/images/image-interview-illust.png';
import ImgHeading from '@/assets/images/image-main-heading.png';
import ImgCardDeck3 from '@/assets/images/image-card-deck-3.png';

import { getQuestionsMain } from '@/api/questions';
import { IQuestionMain } from '@/types';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: 'QCard Home',
    description: 'Start QCard!',
};

export default async function Home() {
    const questionsMain: IQuestionMain = await getQuestionsMain();

    const questionDaily = questionsMain.questionDaily;

    return (
        <>
            <section className="bg-main flex justify-between pt-[16.7rem] pb-[9rem] pr-[4.2rem] pl-[16.2rem]">
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
            </section>
            <section className="flex flex-col bg-blue-1 m-auto pt-[12.6rem] pb-[25.5rem] px-[15.9rem]">
                <h2 className="text-heading2">오늘의 질문</h2>
                <p className="pt-[3rem] text-grey-6 text-specialHeading5">
                    하루에 하나씩, 차근차근 준비해봐요
                </p>
                <div className="mt-[9.9rem] flex justify-center">
                    <DailyQuestionCard question={questionDaily} />
                </div>
            </section>
            <section className="flex flex-col px-[10.7rem] py-[15.9rem]">
                <h3 className="text-heading2">
                    모의 면접으로 실전에 대비하세요.
                </h3>
                <p className="flex mt-[3rem] text-grey-6 text-specialHeading5">
                    실전 같은 연습으로 경험을 쌓아나가요!
                </p>
                <div className="relative mt-[6.9rem]">
                    <Image
                        src={ImgInterviewIllust}
                        alt="img-interview-illust"
                        width={1079}
                        height={703}
                    />
                    <div className="absolute bottom-[7.5rem] left-[calc(50%-35.3rem/2)]">
                        {/* TODO: 버튼 padding 속성 추가 */}
                        <Link href="/interview">
                            <Button type="round" title="모의 면접 바로가기" />
                        </Link>
                    </div>
                </div>
            </section>
            <section className="flex flex-col bg-yellow-1 pt-[14.8rem] pb-[11.7rem] px-[16rem]">
                <h3 className="text-heading2">질문 모음집 보러가기</h3>
                <p className="mt-[3rem] text-grey-6 text-specialHeading5">
                    QCARD 질문부터 미래의 동료들의 질문으로 연습해요!
                </p>
                <div className="relative mt-[4.6rem]">
                    <Image
                        src={ImgMainCategory}
                        alt="img-main-category"
                        width={1131}
                        height={707}
                    />
                    <div className="absolute bottom-[7.5rem] left-[calc(50%-35.3rem/2)]">
                        {/* TODO: 버튼 padding 속성 추가 */}
                        <Link href="/category">
                            <Button type="round" title="큐카드 모음 바로가기" />
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
