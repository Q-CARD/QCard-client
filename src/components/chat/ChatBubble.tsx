interface ChatBubbleProps {
    type: 'question' | 'answer';
    children: string;
    cnt: number;
}

function AnswerBubble({ children }: { children: string }) {
    return (
        <div className="text-heading5 py-[4rem] px-[4.8rem] bg-blue-primary text-white w-fit max-w-[80rem] break-all rounded-tl-3xl rounded-br-3xl rounded-bl-3xl">
            {children}
        </div>
    );
}

function QuestionBubble({ children }: { children: string }) {
    return (
        <div className="text-heading5 py-[4rem] px-[4.8rem] bg-grey-2 text-black w-fit max-w-[80rem] break-all rounded-tr-3xl rounded-br-3xl rounded-bl-3xl">
            {children}
        </div>
    );
}

export default function ChatBubble({ type, children, cnt }: ChatBubbleProps) {
    const answerHeading =
        type === 'question' ? `[꼬리질문 ${cnt}]` : '나의 답변';

    return (
        <div
            className={`flex ${
                type === 'question' ? 'flex-row' : 'flex-row-reverse'
            }`}
        >
            {type === 'question' ? (
                <QuestionBubble>
                    {/*<div>{answerHeading}</div>*/}
                    {children}
                </QuestionBubble>
            ) : (
                <AnswerBubble>
                    {/*<div>{answerHeading}</div>*/}
                    {children}
                </AnswerBubble>
            )}
        </div>
    );
}
