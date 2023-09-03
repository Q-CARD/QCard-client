interface QuestionCardProps {}

export function QuestionCard({}: QuestionCardProps) {
    return (
        <div className="w-[36.8rem] h-[36.8rem] p-[4.85rem] shadow-3 rounded-[1.8rem] flex justify-center cursor-pointer">
            <span className="text-heading3 text-black text-center my-auto">
                {'네트워크 OSI 7계층에 대해 설명해 주세요.'}
            </span>
        </div>
    );
}
