interface InterviewResultLayoutProps {
    children: React.ReactNode;
}

export default function InterviewResultLayout({
    children,
}: InterviewResultLayoutProps) {
    return (
        <section>
            <div className="px-[10rem] py-[3.5rem]">
                <h1 className="text-heading2">모의 면접 결과</h1>
                <div className="text-bodyDefault text-grey-5">
                    녹음했던 나의 답변과 gpt의 첨삭을 확인해보세요
                </div>
            </div>
            <div className="flex flex-col mt-[8rem] mb-[5.8rem] m-auto">
                <section className="flex flex-col items-center min-w-[82rem] m-auto">
                    {children}
                </section>
            </div>
        </section>
    );
}
