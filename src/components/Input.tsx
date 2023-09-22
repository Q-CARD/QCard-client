'use client';

import { UseFormRegisterReturn } from 'react-hook-form';
import { BiCheckCircle } from 'react-icons/bi';
import { TbEyeClosed } from 'react-icons/tb';
import { BiPencil } from 'react-icons/bi';

interface InputProps {
    type?: 'text' | 'password' | 'edit';
    placeholder: string;
    register: UseFormRegisterReturn<any>;
}

export function Input({
    type = 'text',
    placeholder,
    register,
}: InputProps): React.JSX.Element {
    return (
        <div className="relative">
            <input
                className="w-[41.9rem] h-fit p-[2.4rem] pr-[calc(2.4rem+1.5rem+1rem)] bg-grey-1 rounded-[1rem] focus:outline-none text-black text-input placeholder:text-grey-5"
                type={type}
                placeholder={placeholder}
                spellCheck="false"
                {...register}
            />
            <div className="absolute top-[2.4rem] right-[2.4rem]">
                {type === 'text' && (
                    <BiCheckCircle size="15" color="var(--grey-5)" />
                )}
                {type === 'password' && (
                    <TbEyeClosed size="15" color="var(--grey-5)" />
                )}
                {type === 'edit' && (
                    <BiPencil size="15" color="var(--grey-5)" />
                )}
            </div>
        </div>
    );
}
