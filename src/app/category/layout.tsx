interface CategoryLayoutProps {
    children: React.ReactNode;
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
    return <div className="w-screen h-[calc(100vh-11.2rem)]">{children}</div>;
}
