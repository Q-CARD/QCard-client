// 모의 면접 모드 종료 페이지 interview/finish
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import ImgCelebrateTop from '@/assets/images/image-celebrate-top.png';
import ImgCelebrateBtm from '@/assets/images/image-celebrate-bottom.png';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/recoil';

export default function InterviewFinishPage() {
    const user = useRecoilValue(userAtom);
    const [nickname, setNickname] = useState<string>('');

    useEffect(() => {
        setNickname(user.nickname ?? '유저');
    }, []);

    return (
        <section className="bg-finish flex flex-col items-center m-auto pt-[14rem] pb-[13.2rem]">
            <div className="pr-[50rem]">
                <Image
                    src={ImgCelebrateTop}
                    alt="image-celebrate"
                    width={125}
                    height={146}
                    loading="lazy"
                />
            </div>
            <h1 className="text-black text-center text-heading2 leading-[70px]">
                모의 면접이 끝났습니다.
                <br />
                {nickname}님의 성장을 기대할게요!
            </h1>
            <div className="pl-[50rem]">
                <Image
                    src={ImgCelebrateBtm}
                    alt="image-celebrate"
                    width={125}
                    height={146}
                    loading="lazy"
                />
            </div>
            {/*TODO: 버튼 컴포넌트 적용 */}
            <button className="w-fit mt-[5.7rem] py-[2.4rem] px-[3.6rem] bg-blue-primary text-specialHeading3 text-white rounded-[4.7rem]">
                <Link href="/" className="flex items-center gap-[8px]">
                    홈으로 돌아가기
                </Link>
            </button>
        </section>
    );
}
