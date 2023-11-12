'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtom, isLoginAtom } from '@/store/recoil';
import { Button, Input } from '@/components/common';
import ValidationMessage from '@/components/ValidationMessage';

import { deleteAccount, putAccountsProfile } from '@/api/accounts';
import { postPresignedURL } from '@/api/presigned';
import { BsCamera } from 'react-icons/bs';
import defaultImage from '@/assets/icons/icon-default-profile.png';
import { CONSTANTS, ERROR_MESSAGES, REGEX } from '@/constants';
import { deleteCookie } from 'cookies-next';

interface ProfileFormValues {
    nickname: string;
    email: string;
}

export default function MyProfilePage() {
    const [user, setUser] = useRecoilState(userAtom);
    const setIsLogin = useSetRecoilState(isLoginAtom);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        defaultValues: { nickname: user.nickname, email: user.email },
    });

    // 서버 렌더링 결과와 클라이언트 렌더링 결과가 다른 경우 hydration failed 에러 발생, 에러 방지를 위해 dom이 로드됐는지 확인
    const [domLoaded, setDomLoaded] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profileImgURL, setProfileImgURL] = useState<string>(''); // 미리보기용 임시 url
    const [profileImgFile, setProfileImgFile] = useState<File>(); // 이미지 메타정보
    const [presignedUrl, setPresignedUrl] = useState<string>('');
    const [profileUploadUrl, setProfileUploadUrl] = useState<string>(''); // 업로드 결과로 받은 url

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const loadPresignedUrl = async (profileImgFile: any) => {
        try {
            const data = await postPresignedURL({
                fileName: profileImgFile?.name,
            });
            if (data) {
                setPresignedUrl(data);
                return data;
            }
        } catch (e) {
            console.error(e);
            alert('프로필 이미지 등록에 실패했습니다.(1)');
        }
    };

    // onChange - 미리 보기 데이터만 업데이트
    const handleProfileImgChange = async (e: React.ChangeEvent) => {
        const imgMeta = (e.target as HTMLInputElement).files?.[0];

        if (imgMeta) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imgMeta);
            fileReader.onload = (data) => {
                // 미리보기
                setProfileImgURL(
                    typeof data.target?.result === 'string'
                        ? data.target?.result
                        : '',
                );
                setProfileImgFile(imgMeta);
            };
        }
    };

    const getPrifleUploadUrl = async (presignedUrl: string) => {
        let profileUploadUrl;
        if (presignedUrl && profileImgFile) {
            try {
                const data = await fetch(presignedUrl, {
                    method: 'PUT',
                    body: profileImgFile,
                    headers: new Headers({
                        'Content-Type': profileImgFile.type,
                    }),
                });

                if (data) {
                    console.log('data', data);
                    setProfileUploadUrl(data.url.split('?')[0]);
                    profileUploadUrl = data.url.split('?')[0];
                }
            } catch (e) {
                alert('프로필 이미지 등록에 실패했습니다.(2)');
            }
        }
        return profileUploadUrl;
    };

    const handleSubmitProfile = async ({
        nickname,
        email,
    }: ProfileFormValues) => {
        const presignedUrl: string | undefined = await loadPresignedUrl(
            profileImgFile,
        );
        let profileUploadUrl = null;

        if (presignedUrl) {
            profileUploadUrl = await getPrifleUploadUrl(presignedUrl);
        }

        if (presignedUrl && profileImgFile && profileUploadUrl) {
            const payload = {
                name: nickname,
                email: email,
                profile: profileUploadUrl,
            };

            try {
                const data = await putAccountsProfile(payload);
                if (data) {
                    alert('프로필 정보가 수정되었습니다.');

                    const updateProfile = {
                        nickname: nickname,
                        email: email,
                        profileImg: profileUploadUrl,
                    };
                    setUser(updateProfile);
                }
            } catch (e) {
                alert('프로필 정보 수정에 실패했습니다.(3)');
                console.error(e);
            }
        }
    };

    const handleDeleteUser = async () => {
        try {
            const data = await deleteAccount();
            if (data) {
                localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
                localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
                deleteCookie(CONSTANTS.ACCESS_TOKEN);
                setIsLogin(false);
                router.replace('/');
            }
        } catch (e) {}
    };

    return (
        <div className="w-full h-full">
            <div className="w-fit ml-[25%] mt-[8.3rem] flex flex-col items-center gap-[2.4rem] z-1">
                <div className="relative mb-[8.1rem]">
                    <div
                        style={{
                            display: 'flex',
                            position: 'relative',
                            width: '16.4rem',
                            height: '16.4rem',
                        }}
                    >
                        {domLoaded && (
                            <Image
                                src={
                                    profileImgURL ||
                                    (user.profileImg ?? defaultImage)
                                }
                                alt="profile-image"
                                fill
                                sizes="16.4rem"
                                style={{
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                }}
                            />
                        )}
                    </div>
                    <label
                        htmlFor="fileInput"
                        className="absolute bottom-0 right-0 w-[4rem] h-[4rem] rounded-full border-[0.1rem] border-grey-3 bg-white cursor-pointer flex justify-center items-center"
                        onClick={() => {
                            fileInputRef?.current?.click();
                        }}
                    >
                        <input
                            ref={fileInputRef}
                            name="fileInput"
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImgChange}
                        />
                        <BsCamera size="19.2" color="var(--grey-5)" />
                    </label>
                </div>
                <Input
                    type="edit"
                    placeholder="닉네임"
                    register={register('nickname', { required: true })}
                />
                <Input
                    type="edit"
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
                <div className="mt-[1.6rem] mb-[3.6rem]">
                    <Button
                        type="block"
                        title="저장하기"
                        onClick={handleSubmit(handleSubmitProfile)}
                    />
                </div>
                <span
                    className="text-bodyDefault text-grey-5 cursor-pointer"
                    onClick={handleDeleteUser}
                >
                    탈퇴하기
                </span>
            </div>
        </div>
    );
}
