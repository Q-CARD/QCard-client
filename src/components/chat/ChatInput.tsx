import React from 'react';
import useInput from '@/hooks/useInput';

interface ChatInputProps {
    handler: any; // TODO: any
}
export default function ChatInput({ handler }: ChatInputProps) {
    // TODO: debounce 적용

    const handleInput = () => {};

    // const [value, handler, set, reset] = useInput('');
    // [value, handler, set, reset];
    //console.log('value', value);
    return (
        <div className="mt-auto">
            <input
                placeholder="답변을 입력해주세요"
                className="w-full p-[2.4rem] bg-grey-1 rounded-full bodySmall"
                onChange={handler}
            />
        </div>
    );
}
