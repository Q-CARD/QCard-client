'use client';

import { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps {
    placeholder: string;
    register: UseFormRegisterReturn<any>;
}

export function Textarea({ placeholder, register }: TextareaProps) {
    return (
        <textarea
            className="w-[86rem] h-[52rem] p-[3.2rem] text-bodySmall text-black placeholder:text-grey-5 bg-grey-1 rounded-[2rem] border-[0.15rem] focus:outline-none resize-none"
            placeholder={placeholder}
            autoComplete="false"
            {...register}
        />
    );
}
