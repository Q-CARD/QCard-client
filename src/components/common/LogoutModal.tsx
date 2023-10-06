import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from './Button';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { isLoginAtom, userAtom } from '@/store/recoil';
import defaultImage from '@/assets/images/image-default-profile.png';
import { CONSTANTS } from '@/constants';

interface LogoutModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    modalRef: React.RefObject<HTMLDivElement>;
}

export const LogoutModal = ({ open, setOpen, modalRef }: LogoutModalProps) => {
    const router = useRouter();

    const user = useRecoilValue(userAtom);
    const resetUser = useResetRecoilState(userAtom); // TODO - effects 사용 검토
    const setIsLogin = useSetRecoilState(isLoginAtom);

    const handleLogout = () => {
        // TODO - logout api 연동
        resetUser();
        localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
        setIsLogin(false);

        setOpen(false);

        alert('로그아웃 되었습니다.');
        router.push('/');
    };

    if (!open) {
        return;
    }

    return (
        <div
            className="absolute top-[9.8rem] right-[16rem] w-[38rem] h-[26rem] py-[2.9rem] bg-white rounded-[0.6rem] shadow-[0_4px_6px_0_rgba(0,0,0,0.10)] flex flex-col items-center"
            ref={modalRef}
        >
            <div
                style={{
                    display: 'flex',
                    position: 'relative',
                    width: '6rem',
                    height: '6rem',
                    marginBottom: '1.6rem',
                }}
            >
                <Image
                    src={user.profileImg ?? defaultImage}
                    alt="profile-image"
                    fill
                    style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <span className="text-heading3 text-black">{user.nickname}</span>
            <hr className="w-full h-[0.2rem] my-[2rem] bg-grey-2" />
            <Button type="round" title="로그아웃" onClick={handleLogout} />
        </div>
    );
};
