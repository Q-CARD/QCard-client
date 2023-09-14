interface InterviewLayoutProps {
    children: React.ReactNode;
}

export default function InterviewLayoutProps({
    children,
}: InterviewLayoutProps) {
    return (
        <section>
            <h1 className="text-heading2 px-[10rem] py-[3.5rem]">모의 면접</h1>
            <div className="flex flex-col mt-[8rem] mb-[20rem] m-auto">
                {children}
            </div>
        </section>
    );
}
