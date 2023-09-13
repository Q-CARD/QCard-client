import { QUESTION_CATEGORY } from '@/constants/data';

/**
 * @description 카테고리 key에 해당하는 카테고리 name 반환
 */
export const parseCategoryName = (categoryKey: string): string | undefined => {
    return QUESTION_CATEGORY.find((category) => {
        return category.key === categoryKey;
    })?.name;
};
