'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRecoilValue } from 'recoil';
import { Button, Input } from '@/components/common';
import ValidationMessage from '@/components/ValidationMessage';
import { userAtom } from '@/store/recoil';
import { getAccountsProfile, putAccountsProfile } from '@/api/accounts';
import { BsCamera } from 'react-icons/bs';
import defaultImage from '@/assets/icons/icon-default-profile.png';
import { ERROR_MESSAGES, REGEX } from '@/constants';
import { postPresignedURL } from '@/api/presigned';

interface ProfileFormValues {
    nickname: string;
    email: string;
}

export default function MyProfilePage() {
    const user = useRecoilValue(userAtom);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        // defaultValues: async () => getAccountsProfile(),
        defaultValues: { nickname: user.nickname, email: user.email },
    });

    // 서버 렌더링 결과와 클라이언트 렌더링 결과가 다른 경우 hydration failed 에러 발생, 에러 방지를 위해 dom이 로드됐는지 확인
    const [domLoaded, setDomLoaded] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profileImgURL, setProfileImgURL] = useState<string>(''); // 미리보기용 임시 url
    const [profileImgFile, setProfileImgFile] = useState<File>();
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

    // TODO - 이미지 업로드 api 연동
    const handleProfileImgChange = async (e: React.ChangeEvent) => {
        const imgMeta = (e.target as HTMLInputElement).files?.[0];

        if (imgMeta) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imgMeta);
            fileReader.onload = (data) => {
                setProfileImgURL(
                    typeof data.target?.result === 'string'
                        ? data.target?.result
                        : '',
                );
                setProfileImgFile(imgMeta);
            };
        }

        const presignedUrl: string | undefined = await loadPresignedUrl(
            imgMeta,
        );

        if (presignedUrl && imgMeta) {
            try {
                const data = await fetch(presignedUrl, {
                    method: 'PUT',
                    body: imgMeta,
                    headers: new Headers({
                        'Content-Type': imgMeta.type,
                    }),
                });

                if (data) {
                    setProfileUploadUrl(data.url.split('?')[0]);
                    alert('프로필 정보가 수정되었습니다.');
                }
            } catch (e) {
                alert('프로필 이미지 등록에 실패했습니다.(2)');
            }
        }
    };

    // TODO - 프로필 수정 api 연동
    const handleSubmitProfile = async ({
        nickname,
        email,
    }: ProfileFormValues) => {
        if (presignedUrl && profileImgFile) {
            const payload = {
                name: nickname,
                email: email,
                profile: profileUploadUrl,
            };

            try {
                const data = await putAccountsProfile(payload);

                if (data) {
                    alert('프로필 정보가 수정되었습니다.');
                }
            } catch (e) {
                alert('프로필 정보 수정에 실패했습니다.(3)');
                console.error(e);
            }
        }
    };

    // TODO - 유저 탈퇴 api 연동 - 탈퇴 api 요청.
    const handleDeleteUser = () => {};

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
