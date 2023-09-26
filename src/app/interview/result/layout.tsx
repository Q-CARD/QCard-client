interface InterviewResultLayoutProps {
    children: React.ReactNode;
}

export default function InterviewResultLayout({
    children,
}: InterviewResultLayoutProps) {
    return (
        <section className="flex flex-col bg-yellow-1 ">
            <div className="flex flex-col m-auto">
                <div className="py-[4.4rem]">
                    <h1 className="text-heading2">모의 면접 답변 확인하기</h1>
                </div>
                <div className="pb-[3.1rem]">
                    <section className="flex flex-col items-center w-[93rem] m-auto self-stretch text-center">
                        {children}
                    </section>
                </div>
            </div>
        </section>
    );
}
