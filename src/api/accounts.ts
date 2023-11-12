import { http } from '@/utils/fetch';

// 유저 로그인 api - 클라이언트
export const postSignIn = async (payload: any) => {
    // email: string, password: string
    return await http.POST(`/accounts/signin`, payload);
};

// 유저 회원가입 api - 클라이언트
export const postSignUp = async (payload: any) => {
    // name: string, email: string, password: string
    return await http.POST(`/accounts/signup`, payload);
};

// 현재 로그인한 유저의 프로필 정보 반환 (이메일도 표시) - 클라이언트
export const getAccountsProfile = async () => {
    return await http.GET(`/accounts/profile`);
};

// 프로필 수정 - 클라이언트
export const putAccountsProfile = async (payload: any) => {
    return await http.PUT(`/accounts/profile`, payload, { type: 'default' });
};

// 토큰 재발급 api - 서버, 클라이언트 모두 사용될 수 있음
export const getAccountsReissue = async () => {
    return await http.REISSUE(`/accounts/reissue`);
};

// 로그아웃 api - 클라이언트
export const getAccountsLogout = async () => {
    return await http.REISSUE(`/accounts/logout`);
};

// 회원 탈퇴
export const deleteAccount = async () => {
    return await http.DELETE(`/accounts/`);
};
