// 모의 면접 모드 종료 페이지 interview/finish
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ImgCelebrate from '@/assets/images/image-celebrate.png';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
    title: 'Interview Finish',
    description: 'Finish interview',
};

export default function InterviewFinishPage() {
    return (
        <section className="flex flex-col items-center m-auto pt-[10.2rem] pb-[11.8rem]">
            <h1>모의 면접이 끝났습니다</h1>
            <h1>__님의 성장을 기대할게요!</h1>
            <Image
                src={ImgCelebrate}
                alt="image-celebrate"
                width={995}
                height={498}
                loading="lazy"
            />
            <button>
                <Link href="/">메인으로</Link>
            </button>
        </section>
    );
}
