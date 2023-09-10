'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { getAccountsProfile, postSignIn } from '@/api/account';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtom, isLoginAtom } from '@/store/recoil';
import { ACCESS_TOKEN } from '@/constants/constants';

export default function LoginPage() {
    const router = useRouter();

    const { register, handleSubmit } = useForm();

    const [userData, setUserData] = useRecoilState(userAtom);
    const handleLogin = useSetRecoilState(isLoginAtom);

    const handleSubmitLogin = async ({ email, password }: any) => {
        // TODO - validation 적용, any 수정

        const payload = {
            email: email,
            password: password,
        };

        try {
            const data = await postSignIn(payload);

            // TODO - api 성공 응답 code 요청드리기
            if (data.accessToken) {
                localStorage.setItem(ACCESS_TOKEN, data.accessToken);
                // localStorage.setItem('REFRESH_TOKEN', data.refreshToken);

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
                register={register('email', { required: true })}
            />
            <Input
                type="password"
                placeholder="비밀번호"
                register={register('password', { required: true })}
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
