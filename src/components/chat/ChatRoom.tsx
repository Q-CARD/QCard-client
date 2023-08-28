import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import React from 'react';
import useInput from '@/hooks/useInput';

interface ChatRoomProps {
    additionalQuestions: any; // TODO: 타입 수정
}
export default function ChatRoom({
    additionalQuestions,
    ...props
}: ChatRoomProps) {
    // data가 있고,
    const [chatMessages, setChatMessages] = React.useState([]);

    // 현재 답변할 차례인 질문
    const [questionCnt, setQuestionCnt] = React.useState(1);

    // 사용자 답변
    const [answerList, setAnswerList] = React.useState([]);

    const handleAnswerList = (answer: string) => {
        setAnswerList(...answerList, answer);
    };

    React.useEffect(() => {
        // questionCnt에 해당하는 질문을 chatData에 추가
        let regEx = new RegExp(`additional_question_${questionCnt}`);

        if (questionCnt >= 4) return;

        if (additionalQuestions) {
            let questionKey = Object.keys(
                (additionalQuestions && additionalQuestions) || [],
            ).find((el) => regEx.test(el));

            let newQuestion = {
                cnt: questionCnt,
                type: 'question',
                text: additionalQuestions[questionKey],
            };
            setChatMessages([...chatMessages, newQuestion]);
        }
    }, [questionCnt, additionalQuestions]);

    console.log('chatMessages', chatMessages);

    // 사용자 입력 후, 엔터 누르면 questionCnt++
    // questionCnt 증가 -> 다음 꼬리질문 넣기

    /**
     * {
     *  type: "question" // 꼬리 질문
     *  text: ""
     *  초기에는 꼬리질문 1만 담기
     * },
     *
     * {
     *  type: "answer",
     *  text: ""
     *
     * }
     *
     *
     */

    const [value, handler, set, reset] = useInput('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAnswerList(value);
        setQuestionCnt(questionCnt + 1);

        let newAnswer = {
            cnt: questionCnt,
            type: 'answer',
            text: value,
        };
        setChatMessages([...chatMessages, newAnswer]);
        e.target.reset();
    };

    const chatRoomRef = React.useRef(null);

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
