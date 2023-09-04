interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="w-screen y-full mt-[11.2rem] flex flex-col justify-center items-center">
            <div className="mb-[4.606rem] text-[4.2039rem] font-extrabold">
                <span className="text-blue-primary">Q</span>
                <span className="text-black">CARD</span>
            </div>
            {children}
        </div>
    );
}
