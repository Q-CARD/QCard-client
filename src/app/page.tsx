import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import ImgCardDeck3 from '@/assets/images/image-card-deck-3.png';
import ImgCardDeck2 from '@/assets/images/image-card-deck-2.png';
import ImgHeading from '@/assets/images/image-main-heading.png';

export const metadata = {
    title: 'QCard Home',
};

export default function Home() {
    // TODO: box-shadow, button/질문 박스 컴포넌트 적용, seperator 커스텀 클래스 적용
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
                    <button className="pt-[3.4rem]">시작하고 성장하기</button>
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
            <section className="flex px-[15.5rem] py-[17.5rem]">
                <div className="flex-col px-[5rem] py-[6rem]">
                    <h2 className="text-heading2 text-black">오늘의 질문</h2>
                    <p className="pt-[5.8rem] text-grey-6 text-bodyLarger">
                        하루에 하나씩,
                        <br />
                        차근차근 준비해봐요
                    </p>
                </div>
                {/* TODO: 질문 박스 컴포넌트 추가 */}
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
                    <button className="mt-[3.1rem]">
                        <Link href="/interview">모의 면접 시작하기 {'>'}</Link>
                    </button>
                </div>
            </section>
            <hr className="seperator" />
            <section className="flex py-[17.5rem] mx-[11.6rem]">
                <div className="flex">
                    <h3 className="text-heading2 text-black">
                        질문 모음집 보러가기
                    </h3>
                    <p className="ml-[3.7rem] text-grey-6 text-bodyLarger">
                        다양한 카테고리의 큐카드로 면접에 대비해요
                    </p>
                </div>
            </section>
            <Footer />
        </>
    );
}
