// 면접모드 시작 /interview
import type { Metadata } from 'next';
import Image from 'next/image';
import Checkbox from '@/components/Checkbox';
import ImgCardDeck2 from '@/assets/images/image-card-deck-2.png';
import { QUESTION_CATEGORY } from '@/constants/data';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
    title: 'Interview',
    description: 'Start your mock interview',
};

export default function InterviewPage() {
    // TODO: 질문 유형 데이터 api 호출

    return (
        <section className="flex justify-center pt-[17rem] pr-[19.3rem] pb-[17.3rem] pl-[14.4rem]">
            <div>
                <h1>모의 면접을 시작해볼까요?</h1>
                <Image
                    src={ImgCardDeck2}
                    alt="card-deck2"
                    width={427}
                    height={409}
                />
            </div>
            <div className="flex flex-col items-center ml-[19.3rem]">
                <h5>받고 싶은 질문 유형을 선택해주세요</h5>
                {/* TODO: 스크롤 달기 */}
                <div className="h-400 mt-[3.2rem]">
                    {QUESTION_CATEGORY.map((category, idx) => (
                        <Checkbox key={category.id}>{category.name}</Checkbox>
                    ))}
                </div>
            </div>
        </section>
    );
}
