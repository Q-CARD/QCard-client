import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { Button } from '@/components/Button';
import { QuestionCard } from '@/components/card/QuestionCard';
import ImgCardDeck3 from '@/assets/images/image-card-deck-3.png';
import ImgCardDeck2 from '@/assets/images/image-card-deck-2.png';
import ImgHeading from '@/assets/images/image-main-heading.png';
import ImgQuestionCard from '@/assets/images/Question Card.png';
import { QUESTION_CATEGORY } from '@/constants/data';

export const metadata = {
    title: 'QCard Home',
};

async function fetchData() {
    const dynamicData = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/questions/main`,
        { cache: 'no-store' },
    );

    const data = await dynamicData.json();
    return data;
}

export default async function Home() {
    // TODO: box-shadow,seperator 커스텀 클래스 적용, '>' react-icons 적용

    const questionsMain = await fetchData();

    return (
        <>
            <section className="flex justify-between pt-[9.4rem] pb-[6rem] pr-[6.6rem] pl-[12.6rem] shadow-md">
                <div className="flex-col pt-[6rem]">
                    <Image
                        src={ImgHeading}
                        alt="main-heading"
                        width={600}
                        height={140}
                    />
                    <div className="pt-[1.8rem] text-grey-5 text-specialHeading2">
                        __개의 기술 질문과 GPT의 모범답안,
                        <br /> 내가 쓰고 함께 읽는 탄탄한 기술 면접 준비
                    </div>
                    <div className="pt-[3.4rem]">
                        <Button type="round" title="시작하고 성장하기 >" />
                    </div>
                </div>
                <div>
                    <Image
                        src={ImgCardDeck3}
                        alt="card-deck3"
                        width={565}
                        height={463}
                    />
                </div>
            </section>
            <section className="flex justify-between px-[15.5rem] py-[17.5rem]">
                <div className="flex-col px-[5rem] py-[6rem]">
                    <h2 className="text-heading2 text-black">오늘의 질문</h2>
                    <p className="pt-[5.8rem] text-grey-6 text-bodyLarger">
                        하루에 하나씩,
                        <br />
                        차근차근 준비해봐요
                    </p>
                </div>
                <Image
                    src={ImgQuestionCard}
                    alt="card-question"
                    width={860}
                    height={316}
                />
            </section>
            <hr className="seperator" />
            <section className="flex justify-between px-[10rem] py-[17.5rem]">
                <Image
                    src={ImgCardDeck2}
                    alt="card-deck2"
                    width={427}
                    height={409}
                />
                <div className="flex flex-col items-end mt-[5.8rem] mr-[10rem]">
                    <h3 className="text-heading2 text-black">
                        모의 면접은 어떤가요?
                    </h3>
                    <p className="flex mt-[5.8rem] text-grey-6 text-bodyLarger">
                        실전같은 연습으로
                        <br />
                        경험을 쌓아나가요
                    </p>
                    <div className="pt-[3.4rem]">
                        <Link href="/interview">
                            <Button type="round" title="모의 면접 시작하기 >" />
                        </Link>
                    </div>
                </div>
            </section>
            <hr className="seperator" />
            <section className="flex flex-col gap-[5.6rem] py-[17.5rem] mx-[11.6rem]">
                <div className="flex">
                    <h3 className="text-heading2 text-black">
                        질문 모음집 보러가기
                    </h3>
                    <p className="ml-[3.7rem] text-grey-6 text-bodyLarger">
                        다양한 카테고리의 큐카드로 면접에 대비해요
                    </p>
                </div>
                <div className="flex flex-wrap gap-[5.2rem]">
                    <div className="w-[36.8rem] h-[36.8rem] p-[4.85rem] bg-blue-primary shadow-3 rounded-[1.8rem] flex justify-center">
                        <span className="text-[4.4rem] font-bold text-white text-center my-auto">
                            {questionsMain.category}
                        </span>
                    </div>
                    {questionsMain.questions.map((question: any) => {
                        return <QuestionCard question={question} />;
                    })}
                </div>
            </section>
            <Footer />
        </>
    );
}
