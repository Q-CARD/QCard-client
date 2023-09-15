interface ValidationMessageProps {
    message: string;
}

const VALIDATION_MESSAGE_STYLE =
    'text-red-4 text-bodySmaller self-start ml-[1rem] mt-[-1.4rem]'; // TODO - 디자이너 스타일 문의드리기

export default function ValidationMessage({ message }: ValidationMessageProps) {
    return <span className={VALIDATION_MESSAGE_STYLE}>{message}</span>;
}
