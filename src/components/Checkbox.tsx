// 클라이언트 컴포넌트
import React from 'react';

interface CheckboxProps {
    children: string;
    handleCategoryList: (name: string) => void;
}

export default function Checkbox({
    children,
    handleCategoryList,
}: CheckboxProps) {
    // 체크 상태에 따라 테두리 여부 토글
    const [isChecked, setIsChecked] = React.useState(false);

    // TODO: 이벤트 타입 챙기기
    const handleCheckboxClick = (e: any) => {
        // name: any, e: any
        const name = e.target.name;
        const tagName = e.target.tagName;

        if (tagName === 'LABEL') return;
        setIsChecked(!isChecked);

        if (tagName === 'DIV') {
            handleCategoryList(children);
            return;
        }
        handleCategoryList(name);
    };

    return (
        <div
            onClick={handleCheckboxClick}
            className={`flex items-center rounded-3xl border p-[2.4rem] ${
                isChecked ? 'border-blue-primary' : 'border-grey-4'
            } cursor-pointer`}
        >
            <label
                htmlFor={children}
                className={`flex w-[35rem] text-base font-normal items-center ${
                    isChecked ? 'text-blue-primary' : 'text-grey-4'
                } cursor-pointer`}
            >
                {children}
            </label>
            <input
                className="cursor-pointer"
                id={children}
                name={children}
                checked={isChecked}
                type="checkbox"
                readOnly
            />
        </div>
    );
}
