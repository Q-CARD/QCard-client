// 질문 상세 페이지_입력 후
'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { TextBoxWrapper } from '@/components/TextBoxWrapper';
import { Profile } from '@/components/Profile';
import { getQuestion } from '@/api/question';
import { IAnswerHearted, IQuestion } from '@/types';

export default function CategoryResultPage({
    params,
}: {
    params: { id: number };
}) {
    const [questionInfo, setQuestionInfo] = useState<IQuestion | undefined>();

    const [myAnswer, setMyAnswer] = useState<IAnswerHearted | undefined>();
    const [gptAnswer, setGptAnswer] = useState<IAnswerHearted | undefined>();
    const [otherAnswersList, setOtherAnswersList] = useState<IAnswerHearted[]>(
        [],
    );

    useEffect(() => {
        loadQuestionDetail();
    }, []);

    // TODO - question,answer 페이지 중복 호출 개선
    const loadQuestionDetail = async () => {
        try {
            const data = await getQuestion(Number(params.id));

            const myAnswer = data.answers.find((answer: IAnswerHearted) => {
                return answer.isMine;
            });

            const otherAnswers = data.answers.filter(
                (answer: IAnswerHearted) => {
                    return !answer.isMine;
                },
            );

            setQuestionInfo(data.question);
            setMyAnswer(myAnswer);
            setGptAnswer(data.gpt);
            setOtherAnswersList(otherAnswers);
        } catch (e) {}
    };

    return (
        <div className="my-[12.8rem] flex flex-col items-center gap-[3.2rem]">
            <div className="text-specialHeading mb-[0.8rem]">
                <span className="text-blue-primary">Q. </span>
                <span>{questionInfo?.title}</span>
            </div>
            <TextBoxWrapper>{myAnswer?.content ?? ''}</TextBoxWrapper>

            <div className="text-specialHeading mb-[0.8rem]">
                <span className="text-yellow-sub">A. </span>
                <span>GPT의 답변이에요</span>
            </div>
            <TextBoxWrapper>
                <ReactMarkdown
                    children={gptAnswer?.content ?? 'gpt 답변이 없습니다.'}
                    remarkPlugins={[remarkGfm]}
                />
            </TextBoxWrapper>

            <div className="text-specialHeading mb-[0.8rem]">
                <span className="text-yellow-sub">A. </span>
                <span>다른 사람들의 답변도 살펴볼까요?</span>
            </div>
            {otherAnswersList.map((answer: IAnswerHearted) => {
                return (
                    <div
                        key={`other-answer-${answer.answerId}`}
                        className="flex flex-col gap-[1.6rem]"
                    >
                        <Profile account={answer.account} />
                        <TextBoxWrapper>{answer.content}</TextBoxWrapper>
                    </div>
                );
            })}
        </div>
    );
}
