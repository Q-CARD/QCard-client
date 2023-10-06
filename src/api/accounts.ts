import { http } from '@/utils/fetch';

// 유저 로그인 api
export const postSignIn = async (payload: any) => {
    // email: string, password: string
    return await http.POST(`/accounts/signin`, payload);
};

// 유저 회원가입 api
export const postSignUp = async (payload: any) => {
    // name: string, email: string, password: string
    return await http.POST(`/accounts/signup`, payload);
};

// 현재 로그인한 유저의 프로필 정보 반환 (이메일도 표시)
export const getAccountsProfile = async () => {
    return await http.GET(`/accounts/profile`);
};

// 프로필 수정
export const putAccountsProfile = async (payload: any) => {
    return await http.PUT(`/accounts/profile`, payload);
};
