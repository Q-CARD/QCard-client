'use client';

interface TextareaProps {
    placeholder: string;
}

export function Textarea({ placeholder }: TextareaProps) {
    return (
        <textarea
            className="w-[86rem] h-[52rem] p-[3.2rem] text-bodySmall text-black placeholder:text-grey-5 bg-grey-1 rounded-[2rem] border-[0.15rem] focus:outline-none resize-none"
            placeholder={placeholder}
            autoComplete="false"
        />
    );
}
