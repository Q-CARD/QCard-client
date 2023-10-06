import { BsPerson, BsFileEarmarkText } from 'react-icons/bs';
import { LiaPencilRulerSolid } from 'react-icons/lia';

interface MypageNavItemProps {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    isSelected: boolean;
}
export function MypageNavbar() {
    // TODO - MypageNavbar 메뉴 선택

    return (
        <div>
            <MypageNavItem
                title="프로필"
                icon={<BsPerson className="mypageMenuIcon" size="24" />}
                onClick={() => {}}
                isSelected={false}
            />
            <MypageNavItem
                title="내가 쓴 답변"
                icon={
                    <BsFileEarmarkText className="mypageMenuIcon" size="24" />
                }
                onClick={() => {}}
                isSelected={true}
            />
            <MypageNavItem
                title="내가 쓴 질문"
                icon={
                    <LiaPencilRulerSolid className="mypageMenuIcon" size="24" />
                }
                onClick={() => {}}
                isSelected={false}
            />
        </div>
    );
}

const MypageNavItem = ({
    title,
    icon,
    onClick,
    isSelected = false,
}: MypageNavItemProps) => {
    const defaultConfig = 'text-black bg-white';
    const selectedConfig = 'text-blue-primary bg-blue-2';

    return (
        <div
            className={`h-[5rem] px-[1.2rem] rounded-[1rem] flex items-center gap-[1rem] text-bodyDefault cursor-pointer hover:text-blue-primary hover:bg-blue-2 ${
                isSelected ? selectedConfig : defaultConfig
            }`}
        >
            {icon}
            <span>{title}</span>
        </div>
    );
};
