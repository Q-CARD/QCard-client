import { VALIDATION_MESSAGE_STYLE } from '@/styles/styles';

interface ValidationMessageProps {
    message: string;
}

export default function ValidationMessage({ message }: ValidationMessageProps) {
    return <span className={VALIDATION_MESSAGE_STYLE}>{message}</span>;
}
