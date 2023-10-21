import React from 'react';

interface ButtonProps {
    type: 'block' | 'round' | 'chip' | 'black';
    title: string;
    onClick?: () => void;
    disabled?: boolean;
    isChipClicked?: boolean;
}
// TODO - hover / bg /  chip 선택 토글 코드 개선

export function Button({
    type,
    title,
    onClick,
    disabled = false,
    isChipClicked = false,
}: ButtonProps): React.JSX.Element {
    const blockConfig = `w-[41.9rem] h-fit px-[3.6rem] py-[2.4rem] rounded-[1rem] text-buttonBlock text-white bg-blue-primary`;
    const roundConfig = `w-fit h-fit px-[2.4rem] py-[1.8rem] rounded-[3rem] text-buttonRound text-white bg-blue-primary`;
    const chipConfig = `w-fit h-fit px-[2rem] py-[1.1rem] rounded-[2.3rem] text-buttonChip border-[0.2rem] hover:text-white hover:border-transparent hover:bg-blue-primary`;
    const blackConfig = `w-fit h-fit px-[2.4rem] py-[1.8rem] rounded-[3rem] text-buttonRound text-white bg-black`;

    let buttonStyle = '';
    switch (type) {
        case 'block':
            buttonStyle = blockConfig;
            break;
        case 'round':
            buttonStyle = roundConfig;
            break;
        case 'chip':
            buttonStyle = chipConfig;
            break;
        case 'black':
            buttonStyle = blackConfig;
    }

    return type === 'chip' ? ( // TODO - bugFix로 우선 컴포넌트 분기. 추후 개선
        <button
            className={`${buttonStyle} ${
                isChipClicked
                    ? 'text-white border-transparent bg-blue-primary'
                    : 'text-grey-6 border-grey-3 bg-white'
            }`}
            disabled={disabled}
            onClick={onClick}
        >
            {title}
        </button>
    ) : (
        <button
            className={`${buttonStyle}`}
            disabled={disabled}
            onClick={onClick}
        >
            {title}
        </button>
    );
}
