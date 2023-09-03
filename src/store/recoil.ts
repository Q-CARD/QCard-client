import { atom, selectorFamily, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// TODO - any 수정

export const userAtom = atom<any>({
    key: 'user',
    default: { nickname: '', email: '' },
    effects_UNSTABLE: [persistAtom],
});

export const isLoginAtom = atom<any>({
    key: 'isLogin',
    default: false,
    effects_UNSTABLE: [persistAtom],
});
