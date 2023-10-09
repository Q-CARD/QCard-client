import { StaticImageData } from 'next/image';
import { Button } from '@/components/common';
import { QUESTION_CATEGORY } from '@/constants/data';

interface CategoryChipsProps {
    selectedCategory: {
        id: Number;
        key: string;
    };
    selectCategory: (value: {
        id: number;
        name: string;
        image: StaticImageData;
        key: string;
    }) => void;
}

export default function CategoryChips({
    selectedCategory,
    selectCategory,
}: CategoryChipsProps) {
    return (
        <div className="w-full flex flex-wrap gap-[2rem]">
            {QUESTION_CATEGORY.map((category) => (
                <Button
                    key={`button-question-category-${category.id}`}
                    type="chip"
                    title={category.name}
                    onClick={() => {
                        selectCategory(category);
                    }}
                    isChipClicked={selectedCategory.id === category.id}
                />
            ))}
        </div>
    );
}
