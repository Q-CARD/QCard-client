import { MypageNavbar } from '@/components/mypage/MypageNavbar';

interface MypageLayoutProps {
    children: React.ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
    return (
        <div className="w-screen h-[calc(100vh-11.2rem)] flex">
            <MypageNavbar />
            <div className="w-[calc(100%-30rem)] h-full">{children}</div>
        </div>
    );
}
