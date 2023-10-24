import Image from 'next/image';
import { type Metadata } from 'next';
import Link from 'next/link';
import { Footer, Button } from '@/components/common';

import ImgMainCategory from '@/assets/images/image-main-category.png';
import ImgInterviewIllust from '@/assets/images/image-interview-illust.png';

import { getQuestionsMain } from '@/api/questions';
import { IQuestionMain } from '@/types';
import { DailyQuestionCard } from '@/components/card/DailyQuestionCard';
import IntroSection from '@/components/main/IntroSection';

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
            <IntroSection>
                <DailyQuestionCard question={questionDaily} />
            </IntroSection>
            <section className="flex flex-col px-[10.7rem] py-[15.9rem]">
                <h3 className="text-heading2">
                    모의 면접으로 실전에 대비하세요.
                </h3>
                <p className="flex mt-[3rem] text-grey-6 text-specialHeading5">
                    실전 같은 연습으로 경험을 쌓아나가요!
                </p>
                <div className="flex flex-col mt-[6.9rem] items-center">
                    <Image
                        src={ImgInterviewIllust}
                        className="mb-[-7.5rem]"
                        alt="img-interview-illust"
                        width={1079}
                        height={703}
                    />
                    <Link href="/interview">
                        <Button type="long" title="모의 면접 바로가기" />
                    </Link>
                </div>
            </section>
            <section className="flex flex-col bg-yellow-1 pt-[14.8rem] pb-[11.7rem] px-[16rem]">
                <h3 className="text-heading2">질문 모음집 보러가기</h3>
                <p className="mt-[3rem] text-grey-6 text-specialHeading5">
                    QCARD 질문부터 미래의 동료들의 질문으로 연습해요!
                </p>
                <div className="flex flex-col items-center mt-[4.6rem]">
                    <Image
                        src={ImgMainCategory}
                        className="mb-[-7.5rem]"
                        alt="img-main-category"
                        width={1131}
                        height={707}
                    />
                    <Link href="/category">
                        <Button type="long" title="큐카드 모음 바로가기" />
                    </Link>
                </div>
            </section>
            <Footer />
        </>
    );
}
