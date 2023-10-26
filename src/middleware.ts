'use server';
import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';
import { CONSTANTS } from './constants';
// Limit the middleware to paths in matcher array.
export const config = {
    matcher: ['/mypage/:path*', '/interview/:path*', '/category/:path*'],
};

export function middleware(request: NextRequest) {
    // TODO - authenticated 판별 수정 -> cookie
    const cookie = request.cookies.get(CONSTANTS.ACCESS_TOKEN);
    if (false) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}
