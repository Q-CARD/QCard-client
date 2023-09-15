import { QUESTION_CATEGORY } from '@/constants/data';
import { useRecoilValue } from 'recoil';
import { interviewIdAtom } from './atom';

export const categoryKeyToName = (key: string) => {
    return QUESTION_CATEGORY.find((category) => category.key === key)?.name;
};

export const getIdByNum = (num: number) => {
    const obj = useRecoilValue(interviewIdAtom);
    return obj[num];
};

export const intToString = (num: number) => String(num).padStart(2, '0');
