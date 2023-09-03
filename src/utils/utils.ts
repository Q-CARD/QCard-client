import { QUESTION_CATEGORY } from '@/constants/data';
import { useRecoilValue } from 'recoil';
import { interviewIdAtom } from './atom';

// CATEGORY_NW => 네트워크
export const categoryKeyToName = (key: string) => {
    return QUESTION_CATEGORY.find((category) => category.key === key)?.name;
};

export const getIdByNum = (num: number) => {
    const obj = useRecoilValue(interviewIdAtom);
    console.log('[obj]', obj); // [ empty, 22 ,23, 24, ...]
    return obj[num];
};
