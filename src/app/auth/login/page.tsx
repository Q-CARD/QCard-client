'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import wretch from 'wretch';
import { Button, Input } from '@/components/common';
import ValidationMessage from '@/components/ValidationMessage';
import { getAccountsProfile, postSignIn } from '@/api/accounts';
import { useSetRecoilState } from 'recoil';
import { userAtom, isLoginAtom } from '@/store/recoil';
import { CONSTANTS } from '@/constants/common';
import { ERROR_MESSAGES, REGEX } from '@/constants';
import { setCookie } from 'cookies-next';

interface IUserProfile {
    email: string;
    name: string;
    profile: string; // TODO: 프로필 이미지 초기값 null인지 확인
}
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
    const setIsLogin = useSetRecoilState(isLoginAtom);

    const handleSubmitLogin = async ({ email, password }: LoginFormValues) => {
        const payload = {
            email: email,
            password: password,
        };

        try {
            const data = await postSignIn(payload);
            if (data?.accessToken) {
                localStorage.setItem(CONSTANTS.ACCESS_TOKEN, data.accessToken);
                localStorage.setItem(
                    CONSTANTS.REFRESH_TOKEN,
                    data.refreshToken,
                );
                setCookie(CONSTANTS.ACCESS_TOKEN, data.accessToken); // 로그인 판별 미들웨어용

                // 토큰 부착 후 연달아 보내야하므로 api 분리
                const userdata: IUserProfile = await wretch(
                    process.env.NEXT_PUBLIC_API_BASE_URL,
                )
                    .auth(`${data.accessToken}`)
                    .errorType('json')
                    .resolve((r: any) => r.json() as any)
                    .get('/accounts/profile');

                if (userdata) {
                    setUserData({
                        nickname: userdata.name,
                        email: userdata.email,
                        profileImg: userdata.profile,
                    });

                    setIsLogin(true);
                }

                router.push('/');
            }
        } catch (e: any) {
            // const errorResponse = JSON.parse(e.message);
            // alert(errorResponse.details);
        }
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
