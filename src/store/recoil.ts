import { atom, selectorFamily, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

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
