// auth 공통 레이아웃

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div>{children}</div>;
}
