'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import { BsPerson, BsFileEarmarkText } from 'react-icons/bs';
import { LiaPencilRulerSolid } from 'react-icons/lia';

export function MypageNavbar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="w-[30rem] h-full bg-blue-1">
            <div className="w-[16.6rem] mt-[8rem] ml-auto flex flex-col">
                <MypageNavItem
                    title="프로필"
                    icon={<BsPerson className="mypageMenuIcon" size="24" />}
                    onClick={() => {
                        router.push('profile');
                    }}
                    isSelected={pathname.includes('profile')}
                />
                <hr className="w-full h-[0.2rem] border-none bg-blue-3" />
                <MypageNavItem
                    title="나의 답변"
                    icon={
                        <BsFileEarmarkText
                            className="mypageMenuIcon"
                            size="24"
                        />
                    }
                    onClick={() => {
                        router.push('answer');
                    }}
                    isSelected={pathname.includes('answer')}
                />
                <hr className="w-full h-[0.2rem] border-none bg-blue-3" />
                <MypageNavItem
                    title="나의 질문"
                    icon={
                        <LiaPencilRulerSolid
                            className="mypageMenuIcon"
                            size="24"
                        />
                    }
                    onClick={() => {
                        router.push('question');
                    }}
                    isSelected={pathname.includes('question')}
                />
            </div>
        </div>
    );
}

interface MypageNavItemProps {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    isSelected: boolean;
}

const MypageNavItem = ({
    title,
    icon,
    onClick,
    isSelected = false,
}: MypageNavItemProps) => {
    const defaultConfig = 'text-grey-5';
    const selectedConfig = 'text-blue-primary';

    return (
        <div
            className={`h-[8.2rem] px-[1.2rem] flex items-center gap-[1.4rem] text-bodyDefault cursor-pointer hover:text-blue-primary ${
                isSelected ? selectedConfig : defaultConfig
            }`}
            onClick={onClick}
        >
            {icon}
            <span>{title}</span>
        </div>
    );
};
