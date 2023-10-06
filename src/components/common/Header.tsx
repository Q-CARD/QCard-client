'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from './Button';
import { LogoutModal } from './LogoutModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoginAtom, userAtom } from '@/store/recoil';
import { ZINDEX } from '@/constants';
import Logo from '@/assets/logo.png';
import defaultImage from '@/assets/images/image-default-profile.png';

export function Header() {
    // Link: <a>요소 확장 프리페칭 + 클라이언트 사이드 내비게이션
    // useRouter: 프로그래밍 방식으로 라우트 변경 (브라우저 API 처럼 push, replace, reload 사용 가능)

    const pathname = usePathname();
    const isAuthPath = pathname.includes('auth');
    const isMyPagePath = pathname.includes('mypage');

    const user = useRecoilValue(userAtom);
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

    // logout modal
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

    const modalRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (isLogoutModalOpen && e.target !== modalRef.current) {
            setIsLogoutModalOpen(false);
        }
    };

    // right buttons
    const RIGHTBUTTONS = {
        signIn: (
            <Link href="/auth/login">
                <Button type="round" title="Sign in" />
            </Link>
        ),
        profile: (
            <div
                style={{
                    display: 'flex',
                    position: 'relative',
                    width: '6rem',
                    height: '6rem',
                    cursor: 'pointer',
                }}
                onClick={() => setIsLogoutModalOpen((prev) => !prev)}
            >
                <Image
                    src={user.profileImg ?? defaultImage}
                    alt="profile-image"
                    fill
                    style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                    }}
                />
            </div>
        ),
    };
    const [rightButton, setRightButton] = useState<React.ReactNode>(
        RIGHTBUTTONS.signIn,
    );

    useEffect(() => {
        if (user.email && user.email.length > 0) {
            setIsLogin(true);

            setRightButton(RIGHTBUTTONS.profile);
        } else {
            setIsLogin(false);

            setRightButton(RIGHTBUTTONS.signIn);
        }
    }, [isLogin]);

    return (
        <header
            className={`fixed top-0 flex bg-white items-center w-full 
        h-[11.2rem] px-[16rem] shadow-header z-${ZINDEX['50']}`}
            onClick={handleOutsideClick}
        >
            <Link aria-label="Home" href="/">
                <Image
                    src={Logo}
                    alt="qcard-logo"
                    width={134}
                    height={44}
                    className="object-cover"
                    sizes="155px"
                    loading="lazy"
                />
            </Link>

            {!isAuthPath && (
                <>
                    {!isMyPagePath && (
                        <div className="flex gap-[6.3rem] ml-[8.7rem]">
                            <HeaderSingleTab title={'홈'} path="/" />
                            <HeaderSingleTab
                                title={'모의면접'}
                                path="/interview"
                            />
                            <HeaderSingleTab
                                title={'질문모음'}
                                path="/category"
                            />
                        </div>
                    )}

                    <div className="ml-auto" ref={profileRef}>
                        {rightButton}
                    </div>
                </>
            )}

            <LogoutModal
                open={isLogoutModalOpen}
                setOpen={setIsLogoutModalOpen}
                modalRef={modalRef}
            />
        </header>
    );
}

const HeaderSingleTab = ({ title, path }: { title: string; path: string }) => {
    const pathname = usePathname();

    const isSelected = pathname === path;

    return (
        <Link className="h-[11.2rem] " href={path}>
            <span
                className={`h-full pt-[0.4rem] text-heading3 border-b-[0.4rem] flex items-center ${
                    isSelected
                        ? 'text-black border-blue-primary'
                        : 'text-grey-5 hover:text-black border-white hover:border-blue-primary'
                }
                `}
            >
                {title}
            </span>
        </Link>
    );
};
