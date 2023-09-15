import { QUESTION_CATEGORY } from '@/constants/data';
import { useRecoilValue } from 'recoil';
import { interviewIdAtom } from '@/store/recoil';

export const categoryKeyToName = (key: string) => {
    return QUESTION_CATEGORY.find((category) => category.key === key)?.name;
};

export const getIdByNum = (num: number) => {
    const idArr = useRecoilValue(interviewIdAtom);
    return idArr[num];
};

export const intToString = (num: number) => String(num).padStart(2, '0');
