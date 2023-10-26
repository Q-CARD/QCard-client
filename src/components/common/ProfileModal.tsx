import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from './Button';
import { getAccountsLogout } from '@/api/accounts';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { isLoginAtom, userAtom } from '@/store/recoil';
import defaultImage from '@/assets/icons/icon-default-profile.png';
import { CONSTANTS } from '@/constants';
import { deleteCookie } from 'cookies-next';

interface ProfileModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    modalRef: React.RefObject<HTMLDivElement>;
}

export const ProfileModal = ({
    open,
    setOpen,
    modalRef,
}: ProfileModalProps) => {
    const router = useRouter();

    const user = useRecoilValue(userAtom);
    const resetUser = useResetRecoilState(userAtom); // TODO - effects 사용 검토
    const setIsLogin = useSetRecoilState(isLoginAtom);

    const handleProfileClick = () => {
        setOpen(false);
        router.push('/mypage/profile');
    };

    const handleLogout = async () => {
        // TODO - logout api 연동
        try {
            const data = await getAccountsLogout();
            if (data) {
                resetUser();
                deleteCookie(CONSTANTS.ACCESS_TOKEN);
                deleteCookie(CONSTANTS.REFRESH_TOKEN);
                setIsLogin(false);

                setOpen(false);

                alert(data.message);
                router.push('/');
            }
        } catch (e) {
            alert('로그아웃에 실패했습니다.');
        }
    };

    if (!open) {
        return;
    }

    return (
        <div
            className={`absolute top-[9.8rem] right-[16rem] w-[38rem] h-[26rem] pb-[2.9rem] bg-white rounded-[0.6rem] shadow-[0_4px_6px_0_rgba(0,0,0,0.10)] z-[51] flex flex-col items-center`}
            ref={modalRef}
        >
            <div
                className="w-full pt-[2.9rem] flex flex-col items-center gap-[1.6rem] pb-[2rem] rounded-t-[0.6rem] cursor-pointer hover:bg-blue-1 hover:border-blue-primary"
                onClick={handleProfileClick}
            >
                <div
                    style={{
                        display: 'flex',
                        position: 'relative',
                        width: '6rem',
                        height: '6rem',
                    }}
                >
                    <Image
                        src={user.profileImg ?? defaultImage}
                        alt="profile-modal-image"
                        fill
                        sizes="6rem"
                        style={{
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <span className="text-heading3 text-black">
                    {user.nickname}
                </span>
            </div>
            <hr className="w-full h-[0.2rem] mb-[2rem] bg-grey-2" />
            <Button type="round" title="로그아웃" onClick={handleLogout} />
        </div>
    );
};
