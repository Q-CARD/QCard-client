'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/common/Button';

import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '@/store/recoil';
import ImgCardDeck2 from '@/assets/images/image-card-deck-2.png';

export default function MockInterview() {
    const isLogin = useRecoilValue(isLoginAtom);
    const router = useRouter();

    // path 진입 전 로그인 여부 검사
    const beforeEnter = (path: string) => {
        if (isLogin) {
            router.push(path);
        } else {
            alert('로그인이 필요한 기능입니다');
            router.push('/auth/login');
        }
    };

    return (
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
                    <div onClick={() => beforeEnter('/interview')}>
                        <Button type="round" title="모의 면접 시작하기 >" />
                    </div>
                </div>
            </div>
        </section>
    );
}
