import { atom, selectorFamily, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IAnswerInterview } from '@/types';

const { persistAtom } = recoilPersist();

export const userAtom = atom<{ nickname: string; email: string }>({
    key: 'user',
    default: { nickname: '', email: '' },
    effects_UNSTABLE: [persistAtom],
});

export const isLoginAtom = atom<boolean>({
    key: 'isLogin',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const categoryListAtom = atom<string[]>({
    key: 'categoryList',
    default: [],
});

export const interviewListAtom = atom<IAnswerInterview[]>({
    key: 'interviewList',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const interviewIdAtom = atom<number[]>({
    key: 'interviewId',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
