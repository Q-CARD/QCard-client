interface InterviewLayoutProps {
    children: React.ReactNode;
}

export default function InterviewLayoutProps({
    children,
}: InterviewLayoutProps) {
    return (
        <section className="bg-blue-1 flex flex-col pt-[10rem] pb-[12rem]">
            <div className="flex flex-col">{children}</div>
        </section>
    );
}
