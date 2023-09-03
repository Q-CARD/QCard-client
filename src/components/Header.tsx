'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/logo.png';
import { Button } from './Button';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import { userAtom } from '@/store/recoil';


export function Header() {
    // Link: <a>요소 확장 프리페칭 + 클라이언트 사이드 내비게이션
    // useRouter: 프로그래밍 방식으로 라우트 변경 (브라우저 API 처럼 push, replace, reload 사용 가능)

    // TODO: box-shadow: 0px 2px 12px 0px rgba(20, 20, 43, 0.08);
    // TODO: header: z-index: 50 상수화

    const [user, setUser] = useRecoilState(userAtom)
    const [isLogin, setIsLogin ]= useState(false)

    
    let islogin = false

    React.useEffect(() => {
        if(user.email && user.email.length > 0){
            setIsLogin(true)
            //islogin = true
        }
        else {
            //islogin = false
            setIsLogin(false)
        }
    }, [islogin])

    console.log('islogin', islogin)
    

    return (
        <header className="fixed top-0 flex z-50 bg-white justify-between items-center w-full h-[11.2rem] pt-[3.2rem] pb-[2.6rem] px-[10rem] shadow-md">
            <Link aria-label="Home" href="/">
                <Image
                    src={Logo}
                    alt="qcard-logo"
                    width={155}
                    height={54}
                    className="object-cover"
                    sizes="155px"
                    loading="lazy"
                />
            </Link>
            <div className="flex gap-[2.4rem]">
                <Link href="/category">
                    <Button type="round" title="Questions" />
                </Link>

                <Link href= {isLogin ? "/mypage/answer" : "/auth/login" }>
                    <Button type={isLogin ? "black" : "round"} title={isLogin ? "My Page" : "Sign in"} />
                </Link>
            </div>
        </header>
    );
}
