import React from 'react';

import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';

import useInput from '@/hooks/useInput';
import { AnswerType } from '@/types/index';

interface ChatRoomProps {
    additionalQuestions: AnswerType | undefined;
}

interface ChatMessage {
    type: 'question' | 'answer';
    text: string;
    cnt: number;
}

const ERROR_MESSAGE = '질문 Key가 없습니다';

export default function ChatRoom({ additionalQuestions }: ChatRoomProps) {
    const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
    const [questionCnt, setQuestionCnt] = React.useState(1); // 현재 답변할 차례인 질문
    const [answerList, setAnswerList] = React.useState<string[]>([]); // 사용자가 꼬리질문에 작성한 답변 리스트

    const chatRoomRef = React.useRef<HTMLDivElement>(null);

    const handleAnswerList = (answer: string) => {
        setAnswerList([...answerList, answer]);
    };

    const getAdditionalQuestion = () => {
        let regEx = new RegExp(`additional_question_${questionCnt}`);

        if (additionalQuestions) {
            let questionKey: keyof AnswerType = Object.keys(
                additionalQuestions,
            ).find((el) => regEx.test(el)) as keyof AnswerType; // 타입 단언

            let newQuestion: ChatMessage = {
                type: 'question',
                text:
                    (additionalQuestions[questionKey] as string) ??
                    ERROR_MESSAGE,
                cnt: questionCnt,
            };
            setChatMessages([...chatMessages, newQuestion]);
        }
    };

    React.useEffect(() => {
        // questionCnt에 해당하는 질문을 chatData에 추가
        if (questionCnt >= 4) return;
        getAdditionalQuestion();
    }, [questionCnt, additionalQuestions]);

    const [value, handler, set, reset] = useInput('');

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement },
    ) => {
        e.preventDefault();
        handleAnswerList(value as string);
        setQuestionCnt(questionCnt + 1);

        let newAnswer: ChatMessage = {
            type: 'answer',
            text: value as string,
            cnt: questionCnt,
        };

        setChatMessages([...chatMessages, newAnswer]);
        e.target.reset();
    };

    React.useEffect(() => {
        if (chatRoomRef.current) {
            chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div className="flex flex-col w-full h-[63rem]">
            <div
                className="flex flex-col pr-[1rem] gap-[4.8rem] overflow-y-auto pb-[5.4rem]"
                ref={chatRoomRef}
            >
                {chatMessages.map(({ type, cnt, text }, idx) => (
                    <ChatBubble key={`${type}-${idx}`} type={type} cnt={cnt}>
                        {text}
                    </ChatBubble>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-auto">
                <ChatInput disabled={questionCnt >= 4} handler={handler} />
            </form>
        </div>
    );
}