'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import ValidationMessage from '@/components/ValidationMessage';
import { getAccountsProfile, postSignIn } from '@/api/accounts';
import { useSetRecoilState } from 'recoil';
import { userAtom, isLoginAtom } from '@/store/recoil';
import { CONSTANTS } from '@/constants/common';
import { ERROR_MESSAGES, REGEX } from '@/constants';

interface LoginFormValues {
    email: string;
    password: string;
}

export default function LoginPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>();

    const setUserData = useSetRecoilState(userAtom);
    const handleLogin = useSetRecoilState(isLoginAtom);

    const handleSubmitLogin = async ({ email, password }: LoginFormValues) => {
        const payload = {
            email: email,
            password: password,
        };

        try {
            const data = await postSignIn(payload);

            // TODO - api 성공 응답 code 요청드리기
            if (data.accessToken) {
                localStorage.setItem(
                    CONSTANTS.USER.ACCESS_TOKEN,
                    data.accessToken,
                );

                const userdata = await getAccountsProfile();

                if (userdata) {
                    setUserData({
                        nickname: userdata.name,
                        email: userdata.email,
                    });
                    handleLogin(true);
                }

                router.push('/');
            }
        } catch (e) {}
    };

    const moveToSignup = () => {
        router.push('/auth/signup');
    };

    return (
        <form className="flex flex-col items-center gap-[2.4rem]">
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
            <div className="my-[1.6rem]">
                <Button
                    type="block"
                    title="로그인"
                    onClick={handleSubmit(handleSubmitLogin)}
                />
            </div>
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
