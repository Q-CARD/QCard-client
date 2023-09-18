'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import ValidationMessage from '@/components/ValidationMessage';
import { postSignUp } from '@/api/account';
import { ERROR_MESSAGES, REGEX } from '@/constants';

interface SignupFormValues {
    nickname: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export default function SignUpPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupFormValues>();

    const handleSubmitSignup = async ({
        nickname,
        email,
        password,
        passwordConfirm,
    }: SignupFormValues) => {
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
        } catch (e) {}
    };

    return (
        <form className="flex flex-col items-center gap-[2.4rem]">
            <Input
                placeholder="닉네임"
                register={register('nickname', { required: true })}
            />
            <Input
                placeholder="이메일 주소"
                register={register('email', {
                    required: true,
                    pattern: {
                        value: REGEX.EMAIL,
                        message: ERROR_MESSAGES.NOT_MATCH_REGEX.EMAIL,
                    },
                })}
            />
            {errors.email?.message && (
                <ValidationMessage message={errors.email.message} />
            )}
            <Input
                type="password"
                placeholder="비밀번호"
                register={register('password', {
                    required: true,
                    pattern: {
                        value: REGEX.PW,
                        message: ERROR_MESSAGES.NOT_MATCH_REGEX.PW,
                    },
                })}
            />
            {errors.password?.message && (
                <ValidationMessage message={errors.password.message} />
            )}
            <Input
                type="password"
                placeholder="비밀번호 확인"
                register={register('passwordConfirm', {
                    required: true,
                    validate: (passwordConfirm: string) => {
                        if (!watch('password')) return;
                        return (
                            passwordConfirm === watch('password') ||
                            ERROR_MESSAGES.PW_CONFIRM_NOT_MATCH
                        );
                    },
                })}
            />
            {errors.passwordConfirm?.message && (
                <ValidationMessage message={errors.passwordConfirm.message} />
            )}
            <div className="my-[1.6rem]">
                <Button
                    type="block"
                    title="회원가입"
                    onClick={handleSubmit(handleSubmitSignup)}
                />
            </div>
        </form>
    );
}
