// 클라이언트 컴포넌트
import React, { MouseEvent } from 'react';

interface CategoryNameCardProps {
    children: string;
    handleCategoryList: (name: string | undefined, isChecked: boolean) => void;
    isCheckableNum: number;
}

export default function CategoryNameCard({
    children,
    handleCategoryList,
    isCheckableNum,
}: CategoryNameCardProps) {
    const [isChecked, setIsChecked] = React.useState(false);

    const handleCheckboxClick = (event: MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLInputElement;
        const category = target.dataset.category;

        if (isCheckableNum < 3 || (isCheckableNum === 3 && isChecked))
            setIsChecked(!isChecked);

        handleCategoryList(category, isChecked);
    };

    return (
        <div
            onClick={handleCheckboxClick}
            data-category={children}
            className={`flex justify-center w-[26rem] h-[7rem] rounded-[1rem] px-[3rem] py-[2.1rem] ${
                isChecked
                    ? 'bg-blue-primary text-white'
                    : 'bg-white text-grey-6'
            } cursor-pointer`}
        >
            <span
                data-category={children}
                className="flex justify-center items-center text-center text-heading4"
            >
                {children}
            </span>
        </div>
    );
}
