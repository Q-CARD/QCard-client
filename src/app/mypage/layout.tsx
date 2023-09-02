import { BsPerson, BsFileEarmarkText } from 'react-icons/bs';
import { LiaPencilRulerSolid } from 'react-icons/lia';

interface MypageLayoutProps {
    children: React.ReactNode;
}

interface MyPageMenuItemProps {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    isSelected: boolean;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
    // TODO - 메뉴 선택

    return (
        <div className="w-screen y-full flex">
            <div className="y-full min-w-[20rem] ml-[11.5rem] mt-[6rem] flex flex-col gap-[1.6rem]">
                <MyPageMenuItem
                    title="프로필"
                    icon={<BsPerson className="mypageMenuIcon" size="24" />}
                    onClick={() => {}}
                    isSelected={false}
                />
                <MyPageMenuItem
                    title="내가 쓴 답변"
                    icon={
                        <BsFileEarmarkText
                            className="mypageMenuIcon"
                            size="24"
                        />
                    }
                    onClick={() => {}}
                    isSelected={true}
                />
                <MyPageMenuItem
                    title="내가 쓴 질문"
                    icon={
                        <LiaPencilRulerSolid
                            className="mypageMenuIcon"
                            size="24"
                        />
                    }
                    onClick={() => {}}
                    isSelected={false}
                />
            </div>
            {children}
        </div>
    );
}

const MyPageMenuItem = ({
    title,
    icon,
    onClick,
    isSelected = false,
}: MyPageMenuItemProps) => {
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
