interface ButtonProps {
    type: 'block' | 'round' | 'chip';
    title: string;
    onClick: any;
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
    const blockConfig = `w-[41.9rem] h-fit px-[3.6rem] py-[2.4rem] rounded-[2rem] text-buttonBlock text-white bg-blue-primary`;
    const roundConfig = `w-fit h-fit px-[2.4rem] py-[1.8rem] rounded-[3rem] text-buttonRound text-white bg-blue-primary`;
    const chipConfig = `w-fit h-fit px-[1.8rem] py-[1.4rem] rounded-[3rem] text-buttonChip text-grey-6 bg-grey-2 hover:text-white hover:bg-blue-primary`;

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
    }

    return (
        <button
            className={`${buttonStyle} ${
                isChipClicked && 'text-white bg-blue-primary'
            }`}
            disabled={disabled}
            onClick={onClick}
        >
            {title}
        </button>
    );
}
