interface InterviewFollowUpLayoutProps {
    children: React.ReactNode;
}

export default function InterviewFollowUpLayout({
    children,
}: InterviewFollowUpLayoutProps) {
    return (
        <section>
            <div className="px-[10rem] py-[3.5rem]">
                <h1 className="text-heading2">모의 면접 결과</h1>
                <div className="text-bodyDefault text-grey-5">
                    나의 답변을 기반으로 꼬리질문을 받아보세요
                </div>
            </div>
            <div className="flex flex-col mt-[8rem] mb-[21rem] m-auto">
                {children}
            </div>
        </section>
    );
}
