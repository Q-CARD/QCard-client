'use server';
import { NextRequest, NextResponse } from 'next/server';
import { CONSTANTS } from './constants';

export const config = {
    matcher: [
        '/mypage/:path*',
        '/interview/question/:path*',
        '/interview/result/:path*',
        '/interview/followup/:path*',
        '/category/:path*',
    ],
};

// 로그인 필요한 페이지 진입 전 로그인 여부 확인
export function middleware(request: NextRequest) {
    const cookie: string | undefined = request.cookies.get(
        CONSTANTS.ACCESS_TOKEN,
    )?.value;

    if (!cookie) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}
