import { ReactElement } from 'react';

interface ChatBubbleProps {
    type: 'question' | 'answer';
    children: string;
    cnt: number;
}

function AnswerBubble({ children }: { children: string | React.ReactNode }) {
    return (
        <div className="text-bodyDefault py-[4rem] px-[4.8rem] bg-blue-primary text-white w-fit max-w-[80rem] break-all rounded-tl-[4rem] rounded-br-[4rem] rounded-bl-[4rem]">
            {children}
        </div>
    );
}

function QuestionBubble({ children }: { children: string | React.ReactNode }) {
    return (
        <div className="text-bodyDefault py-[4rem] px-[4.8rem] bg-grey-2 text-black w-fit max-w-[80rem] break-all rounded-tr-[4rem] rounded-br-[4rem] rounded-bl-[4rem]">
            {children}
        </div>
    );
}

export default function ChatBubble({ type, children, cnt }: ChatBubbleProps) {
    return (
        <div
            className={`flex ${
                type === 'question' ? 'flex-row' : 'flex-row-reverse'
            }`}
        >
            {type === 'question' ? (
                <QuestionBubble>
                    <div className="text-heading5">{`[꼬리질문 ${cnt}]`}</div>
                    {children}
                </QuestionBubble>
            ) : (
                <AnswerBubble>
                    <div className="text-heading5">[나의 답변]</div>
                    {children}
                </AnswerBubble>
            )}
        </div>
    );
}
