'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export default function LoginPage() {
    const router = useRouter();

    const { register, handleSubmit } = useForm();

    const handleSubmitLogin = (e: any) => {
        // TODO - validation 진행 후, api 연동
    };

    const moveToSignup = () => {
        router.push('/auth/signup');
    };

    return (
        <form className="flex flex-col items-center gap-[2.4rem]">
            <Input placeholder="이메일 주소" register={register('username')} />
            <Input
                type="password"
                placeholder="비밀번호"
                register={register('password')}
            />
            <Button
                type="block"
                title="로그인"
                onClick={handleSubmit(handleSubmitLogin)}
            />
            <div className="text-input">
                <span className="text-grey-5">회원이 아닌가요? </span>
                <span
                    className="text-blue-primary cursor-pointer"
                    onClick={moveToSignup}
                >
                    회원가입
                </span>
            </div>
        </form>
    );
}
