interface InterviewFollowUpLayoutProps {
    children: React.ReactNode;
}

export default function InterviewFollowUpLayout({
    children,
}: InterviewFollowUpLayoutProps) {
    return (
        <section className="bg-yellow-1">
            <div className="pt-[4.3rem] m-auto w-[92.9rem] pb-[10.8rem]">
                {children}
            </div>
        </section>
    );
}
