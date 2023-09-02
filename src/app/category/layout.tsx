interface CategoryLayoutProps {
    children: React.ReactNode;
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
    return <div className="w-screen y-full">{children}</div>;
}
