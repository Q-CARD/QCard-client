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

    // 현재 답변할 차례인 질문
    const [questionCnt, setQuestionCnt] = React.useState(1);

    // 사용자가 꼬리질문에 작성한 답변 리스트
    const [answerList, setAnswerList] = React.useState<string[]>([]);

    const handleAnswerList = (answer: string) => {
        setAnswerList([...answerList, answer]);
    };

    // || OR 연산자는 falsy value 체크
    // falsy: false, undefined, null, 0, NaN, []

    // ?? Null 연산자는 undefined와 null만 체크
    React.useEffect(() => {
        // questionCnt에 해당하는 질문을 chatData에 추가
        let regEx = new RegExp(`additional_question_${questionCnt}`);

        if (questionCnt >= 4) return;

        if (additionalQuestions) {
            // 1, 2, 3이 무조건 있어야 함
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

        // 문제: EventTarget에 reset property가 없음
        // 1. 타입 단언
        // (e.target as HTMLFormElement).reset()

        // 2. 타입 선언
        // target에 HTMLFormElement를 타입에 선언해줄 수 있다
        // e: React.FormEvent<HTMLFormElement> & { target : HTMLFormElement }
        e.target.reset();
    };

    const chatRoomRef = React.useRef<HTMLDivElement>(null);

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
                {chatMessages.map((chatMessage, idx) => (
                    <ChatBubble
                        key={`${chatMessage.type}-${chatMessage.text}`}
                        type={chatMessage.type}
                        cnt={chatMessage.cnt}
                    >
                        {chatMessage.text}
                    </ChatBubble>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-auto">
                <ChatInput handler={handler} />
            </form>
        </div>
    );
}
