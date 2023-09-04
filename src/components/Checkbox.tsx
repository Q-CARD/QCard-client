// 클라이언트 컴포넌트
import React from 'react';
//import IconCheck from '@/assets/icons/icon-check.png';
import Image from 'next/image';

interface CheckboxProps {
    children: string;
    handleCategoryList: (name: string, isChecked: boolean) => void;
    isCheckableNum: number; // 체크한 개수
}

export default function Checkbox({
    children,
    handleCategoryList,
    isCheckableNum,
}: CheckboxProps) {
    // 체크 상태에 따라 테두리 여부 토글
    const [isChecked, setIsChecked] = React.useState(false);

    // TODO: 이벤트 타입 챙기기
    const handleCheckboxClick = (e: any) => {
        const name = e.target.name;
        const tagName = e.target.tagName;

        if (tagName === 'LABEL') return;

        // 체크한 개수가 3개보다 적거나, 체크한게 3개인데 체크가 이미 되어 있는 상태라면 (체크 해제하는 상태라면)
        if (isCheckableNum < 3 || (isCheckableNum === 3 && isChecked))
            setIsChecked(!isChecked);

        if (tagName === 'DIV') {
            handleCategoryList(children, isChecked);
            return;
        }
        handleCategoryList(name, isChecked);
    };

    return (
        <div
            onClick={handleCheckboxClick}
            className={`w-[30vw] max-w-[41rem] flex items-center rounded-3xl border p-[2.4rem] ${
                isChecked ? 'border-blue-primary' : 'border-grey-4'
            } cursor-pointer`}
        >
            <label
                htmlFor={children}
                className={`flex flex-1 text-bodySmall items-center ${
                    isChecked ? 'text-blue-primary' : 'text-grey-4'
                } cursor-pointer`}
            >
                {children}
            </label>
            <input
                id={children}
                name={children}
                checked={isChecked}
                type="checkbox"
                readOnly
            />
        </div>
    );
}
