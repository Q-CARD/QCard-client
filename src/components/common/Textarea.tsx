'use client';

import { CSSProperties } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps {
    placeholder: string;
    register: UseFormRegisterReturn<any>;
    defaultValue?: string;
    style?: CSSProperties;
}

export function Textarea({
    placeholder,
    register,
    defaultValue,
    style,
}: TextareaProps) {
    return (
        <textarea
            className="w-[78.8rem] h-[41.2rem] p-[3.2rem] text-bodySmall text-black placeholder:text-grey-5 bg-grey-1 rounded-[1rem] border-[0.3rem] border-transparent focus:outline-none focus:ring-3 focus:border-blue-3 focus:bg-white resize-none"
            style={style}
            placeholder={placeholder}
            autoComplete="false"
            defaultValue={defaultValue}
            {...register}
        />
    );
}
