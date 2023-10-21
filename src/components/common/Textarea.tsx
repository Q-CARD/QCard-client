'use client';

import { CSSProperties } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps {
    placeholder: string;
    register: UseFormRegisterReturn<any>;
    defaultValue?: string;
    type?: 'short' | 'default';
    style?: CSSProperties;
}

export function Textarea({
    type = 'default',
    placeholder,
    register,
    defaultValue,
    style,
}: TextareaProps) {
    const defaultConfig = `w-[78.8rem] h-[41.2rem] p-[3.2rem]`;
    const shortConfig = `w-[78.8rem] h-[30.6rem] p-[2.5rem]`;

    let textareaStyle = '';

    switch (type) {
        case 'short':
            textareaStyle = shortConfig;
        default:
            textareaStyle = defaultConfig;
    }

    return (
        <textarea
            className={`${textareaStyle} text-bodyTextarea text-black placeholder:text-grey-5 bg-grey-1 rounded-[1rem] border-[0.3rem] border-transparent focus:outline-none focus:ring-3 focus:border-blue-3 focus:bg-white resize-none`}
            style={style}
            placeholder={placeholder}
            autoComplete="false"
            defaultValue={defaultValue}
            {...register}
        />
    );
}
