import IconYoutube from '@/assets/icons/icon-youtube.png';
import IconInstagram from '@/assets/icons/icon-instagram.png';
import Image from 'next/image';

export default function Footer() {
    // aria-label: 이미지의 대체 텍스트 역할
    // aria-labelledby: 화면에 현재 요소를 설명할 텍스트가 있는 경우 텍스트(id)와 현재 요소 연결
    // 링크: https://abcdqbbq.tistory.com/77

    return (
        <footer className="w-full flex justify-between items-center h-[16.2rem] px-[10rem] py-[6.2rem]">
            <section id="footer-content">
                <p className="text-grey-5 text-bodyDefault">
                    Copyright © 2023 BRIX Templates | All Rights Reserved
                </p>
            </section>
            <section id="footer-link">
                <div className="flex ml-auto gap-[1.6rem]">
                    <Image
                        src={IconInstagram}
                        alt="icon-instagram"
                        className="cursor-pointer"
                        width={36}
                        height={36}
                    />
                    <Image
                        src={IconYoutube}
                        alt="icon-youtube"
                        className="cursor-pointer"
                        width={36}
                        height={36}
                    />
                </div>
            </section>
        </footer>
    );
}
