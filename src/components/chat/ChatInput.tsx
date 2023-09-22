import React from 'react';

interface ChatInputProps {
    handler: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => void;
    disabled: boolean;
}
export default function ChatInput({ handler, disabled }: ChatInputProps) {
    // TODO: debounce 적용

    return (
        <div className="mt-auto">
            <input
                placeholder="답변을 입력해주세요"
                className="w-full p-[2.4rem] bg-grey-1 rounded-full text-bodySmall"
                onChange={handler}
                disabled={disabled}
            />
        </div>
    );
}
