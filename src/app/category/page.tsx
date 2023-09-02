'use client';

import { CategoryCard } from '@/components/card/CategoryCard';
import { ICategory } from '@/types';
import { QUESTION_CATEGORY } from '@/constants/data';

// 질문 모음집 리스트_1 /category
export default function CategoryPage() {
    return (
        <div className="mx-[10rem] mb-[11.8rem]">
            <div className="mt-[14.8rem] mb-[4.8rem] text-heading2">
                질문 모음집
            </div>
            <div className="flex flex-wrap gap-[4.4rem]">
                {QUESTION_CATEGORY.map((category: ICategory) => (
                    <CategoryCard categoryInfo={category} />
                ))}
            </div>
        </div>
    );
}
