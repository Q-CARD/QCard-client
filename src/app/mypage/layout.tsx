import { MypageNavbar } from '@/components/mypage/MypageNavbar';

interface MypageLayoutProps {
    children: React.ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
    return (
        <div className="w-screen y-full flex">
            <div className="y-full min-w-[20rem] ml-[11.5rem] mt-[6rem] flex flex-col gap-[1.6rem]">
                <MypageNavbar />
            </div>
            {children}
        </div>
    );
}
