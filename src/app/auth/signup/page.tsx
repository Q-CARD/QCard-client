'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { postSignUp } from '@/api/account';

export default function SignUpPage() {
    const router = useRouter();

    const { register, handleSubmit, setError } = useForm();

    // TODO - any
    const handleSubmitSignup = async ({ nickname, email, password }: any) => {
        const payload = {
            name: nickname,
            email: email,
            password: password,
        };

        try {
            const data = await postSignUp(payload);

            // TODO - api 성공 응답 code 요청드리기
            if (data.message === '성공적으로 회원가입 되셨습니다.') {
                alert(data.message);

                router.push('/auth/login');
            }
        } catch (e) {
            // console.log(e);
        }
    };

    // TODO - PW validation
    const handlePWConfirm = (data: any) => {
        if (data.password !== data.passwordCheck) {
            setError(
                'passwordCheck',
                { message: '비밀번호가 일치하지 않습니다.' },
                { shouldFocus: true },
            );
        }
    };

    return (
        <form className="flex flex-col items-center gap-[2.4rem]">
            <Input
                placeholder="닉네임"
                register={register('nickname', { required: true })}
            />
            <Input
                placeholder="이메일 주소"
                register={register('email', { required: true })}
            />
            <Input
                type="password"
                placeholder="비밀번호"
                register={register('password', { required: true })}
            />
            <Input
                type="password"
                placeholder="비밀번호 확인"
                register={register('passwordCheck', { required: true })}
            />
            <Button
                type="block"
                title="회원가입"
                onClick={handleSubmit(handleSubmitSignup)}
            />
        </form>
    );
}
