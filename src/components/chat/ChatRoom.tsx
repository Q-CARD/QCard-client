import React from 'react';

import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';

import useInput from '@/hooks/useInput';
import { AnswerType } from '@/types/index';
import { submitAdditionalAnswer } from '@/api/interview';

interface ChatRoomProps {
    additionalQuestions: AnswerType | undefined;
    handleAnswerCnt: (answerCnt: number) => void;
}

interface ChatMessage {
    type: 'question' | 'answer';
    text: string;
    cnt: number;
}

const ERROR_MESSAGE = '꼬리 질문이 없습니다';

export default function ChatRoom({
    additionalQuestions,
    handleAnswerCnt,
}: ChatRoomProps) {
    const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
    const [questionCnt, setQuestionCnt] = React.useState(1); // 현재 답변할 차례인 질문
    const [answerList, setAnswerList] = React.useState<string[]>([]); // 사용자가 꼬리질문에 작성한 답변 리스트

    const chatRoomRef = React.useRef<HTMLDivElement>(null);

    const handleAnswerList = (answer: string) => {
        setAnswerList([...answerList, answer]);
    };

    // 세 개가 되면 전송하기
    const getAdditionalQuestion = () => {
        let regEx = new RegExp(`additional_question_${questionCnt}`);

        if (additionalQuestions) {
            let questionKey: keyof AnswerType = Object.keys(
                additionalQuestions,
            ).find((el) => regEx.test(el)) as keyof AnswerType;

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

    const submitAnswer = async () => {
        // 세 번 전송
        if (answerList.length === 3) {
            for (let questionCnt = 1; questionCnt <= 3; questionCnt++) {
                let body = {
                    sequence: questionCnt,
                    question_id: additionalQuestions?.question,
                    answer: answerList?.[questionCnt - 1],
                };

                await submitAdditionalAnswer(body);
            }
        }
    };
    // 답변이 세개가 되면 전송
    React.useEffect(() => {
        submitAnswer();
    }, [answerList.length]);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement },
    ) => {
        e.preventDefault();
        // 답변 없는 경우 종료
        if (!value) return;

        handleAnswerList(value as string);
        setQuestionCnt(questionCnt + 1);

        let newAnswer: ChatMessage = {
            type: 'answer',
            text: value as string,
            cnt: questionCnt,
        };

        setChatMessages([...chatMessages, newAnswer]);
        reset();
        e.target.reset();
    };

    React.useEffect(() => {
        if (chatRoomRef.current) {
            chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
        }
        handleAnswerCnt(answerList.length);
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
