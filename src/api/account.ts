import { GET, POST } from '@/utils/axios';

// 유저 로그인 api
export const postSignIn = async (payload: any) => {
    // email: string, password: string
    return await POST(`/accounts/signin`, payload);
};

// 유저 회원가입 api
export const postSignUp = async (payload: any) => {
    // name: string, email: string, password: string
    return await POST(`/accounts/signup`, payload);
};

// 현재 로그인한 유저의 프로필 정보 반환 (이메일도 표시)
export const getAccountsProfile = async () => {
    return await GET(`/accounts/profile`);
};
