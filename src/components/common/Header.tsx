'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from './Button';
import { ProfileModal } from './ProfileModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoginAtom, userAtom } from '@/store/recoil';
import Logo from '@/assets/logo.png';
import defaultImage from '@/assets/icons/icon-default-profile.png';
import { CONSTANTS } from '@/constants';

export function Header() {
    const pathname = usePathname();
    const isAuthPath = pathname.includes('auth');
    const isMyPagePath = pathname.includes('mypage');

    const user = useRecoilValue(userAtom);
    const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

    let isLoginToken: string | null = null;
    if (typeof window !== 'undefined') {
        isLoginToken = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    }

    // logout modal
    const [isProfileModalOpen, setIsProfileModalOpen] =
        useState<boolean>(false);

    const modalRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (e.target instanceof Element) {
            const refChildren = Array.from(modalRef.current?.children ?? []);
            const isProfileModalClicked =
                e.target === modalRef.current || refChildren.includes(e.target);

            if (isProfileModalOpen && !isProfileModalClicked) {
                setIsProfileModalOpen(false);
            }
        }
    };

    // right buttons
    const RIGHTBUTTONS = {
        // 로그인 안한 경우
        signIn: (
            <Link href="/auth/login">
                <Button type="round" title="Sign in" />
            </Link>
        ),
        // 로그인한 경우
        profile: (
            <div
                style={{
                    display: 'flex',
                    position: 'relative',
                    width: '6rem',
                    height: '6rem',
                    cursor: 'pointer',
                }}
                onClick={() => setIsProfileModalOpen((prev) => !prev)}
            >
                <Image
                    src={
                        user?.profileImg?.length > 0
                            ? user.profileImg
                            : defaultImage
                    }
                    alt="profile-image"
                    fill
                    sizes="6rem"
                    style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                    }}
                />
            </div>
        ),
    };
    const [rightButton, setRightButton] = useState<React.ReactNode>(
        RIGHTBUTTONS.signIn, // 기본은 로그인 안한 값
    );

    useEffect(() => {
        if (!isLoginToken) {
            setIsLogin(false);
            setRightButton(RIGHTBUTTONS.signIn);
        } else if (user.email && user.email.length > 0) {
            setIsLogin(true);

            setRightButton(RIGHTBUTTONS.profile);
        } else {
            setIsLogin(false);

            setRightButton(RIGHTBUTTONS.signIn);
        }
    }, [isLogin, isLoginToken, user]);

    return (
        <header
            className={`fixed top-0 flex bg-white items-center w-full 
        h-[11.2rem] px-[16rem] shadow-header z-50`}
            onClick={handleOutsideClick}
        >
            <Link aria-label="Home" href="/">
                <Image
                    src={Logo}
                    alt="qcard-logo"
                    width={134}
                    height={44}
                    style={{
                        width: 'auto',
                        height: 'auto',
                    }}
                    className="object-cover"
                    sizes="155px"
                    //loading="lazy"
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

            <ProfileModal
                open={isProfileModalOpen}
                setOpen={setIsProfileModalOpen}
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
