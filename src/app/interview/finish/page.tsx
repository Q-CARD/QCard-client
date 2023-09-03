// 모의 면접 모드 종료 페이지 interview/finish
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ImgCelebrate from '@/assets/images/image-celebrate.png';
import { AiOutlineArrowRight } from 'react-icons/ai';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: 'Interview Finish',
    description: 'Finish interview',
};

export default function InterviewFinishPage() {
    return (
        <section className="flex flex-col items-center m-auto pt-[10.2rem] pb-[11.8rem]">
            <h1 className="text-black text-heading2">
                모의 면접이 끝났습니다
                <br />
                __님의 성장을 기대할게요!
            </h1>
            <Image
                src={ImgCelebrate}
                alt="image-celebrate"
                width={995}
                height={498}
                loading="lazy"
            />
            <button className="w-fit mt-[5.7rem] py-[2.4rem] px-[3.6rem] bg-blue-primary text-specialHeading3 text-white rounded-[4.7rem]">
                <Link href="/" className="flex items-center gap-[8px]">
                    메인으로 <AiOutlineArrowRight size={15} color="#fff" />
                </Link>
            </button>
        </section>
    );
}
