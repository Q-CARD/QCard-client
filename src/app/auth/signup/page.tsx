'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export default function SignUpPage() {
    const router = useRouter();

    const { register, handleSubmit } = useForm();

    const handleSubmitSignup = (e: any) => {
        // TODO - validation 진행 후, api 연동
    };

    return (
        <form className="flex flex-col items-center gap-[2.4rem]">
            <Input placeholder="닉네임" register={register('nickname')} />
            <Input placeholder="이메일 주소" register={register('email')} />
            <Input
                type="password"
                placeholder="비밀번호"
                register={register('password')}
            />
            <Input
                type="password"
                placeholder="비밀번호 확인"
                register={register('passwordCheck')}
            />
            <Button
                type="block"
                title="회원가입"
                onClick={handleSubmit(handleSubmitSignup)}
            />
        </form>
    );
}
