import { QUESTION_CATEGORY } from '@/constants/data';

/**
 * @description 카테고리 key에 해당하는 카테고리 name 반환
 */
export const parseCategoryName = (categoryKey: string): string | undefined => {
    return QUESTION_CATEGORY.find((category) => {
        return category.key === categoryKey;
    })?.name;
};

/**
 * @description 카테고리 key에 해당하는 카테고리 name 반환
 */
export const categoryKeyToName = (key: string) => {
    return QUESTION_CATEGORY.find((category) => category.key === key)?.name;
};

/**
 * @description 두 자리 맞춰서 int to string 형변환
 */
export const intToString = (num: number) => String(num).padStart(2, '0');
