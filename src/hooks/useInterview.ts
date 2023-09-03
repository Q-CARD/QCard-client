import { useRecoilValue } from 'recoil';
import { interviewIdAtom } from '@/utils/atom';

export const useInterview = (num: number) => {
    const obj = useRecoilValue(interviewIdAtom);
    console.log('[obj]', obj); // [ empty, 22 ,23, 24, ...]
    return obj[num];
};
