import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { IAnswerInterview, IAnswerFollwupQuestion } from '@/types';
import { submitAdditionalAnswer } from '@/api/interview';
import { Textarea } from '../common';

interface FollowupCardProps {
    questionList: IAnswerInterview | undefined;
    getAnswerLen: (answerCnt: number) => void;
}

interface IFormInput {
    followup_answer: string;
}

const ERROR_MESSAGE = '꼬리 질문이 없습니다';

export default function FollwupCard({
    questionList,
    getAnswerLen,
}: FollowupCardProps) {
    const [questionCnt, setQuestionCnt] = React.useState<number>(1);
    const [answerList, setAnswerList] = React.useState<string[]>([]);
    const [question, setQuestion] = React.useState<string>();

    const { register, handleSubmit, reset } = useForm<IFormInput>();

    // 다음 질문 찾기
    const getNextQuestion = () => {
        let regEx = new RegExp(`additional_question_${questionCnt}`);

        console.log('questionList', questionList);
        if (questionList) {
            let questionKey: keyof IAnswerInterview = Object.keys(
                questionList,
            ).find((el) => regEx.test(el)) as keyof IAnswerInterview;

            console.log('next question', questionList[questionKey]);
            setQuestion(questionList[questionKey] as string);
        } else {
            console.log('questionList 없음');
        }
    };

    // questionCnt가 바뀌면 다음 질문 세팅
    React.useEffect(() => {
        console.log(questionCnt);
        if (questionCnt >= 4) return;
        getNextQuestion();
        getAnswerLen(questionCnt);
    }, [questionCnt]);

    const checkAnswerCount = () => {
        if (answerList.length < 3) {
            setQuestionCnt((prev) => prev + 1); // 다음문제로 이동
            reset();
            return false;
        }
        return true;
    };

    const submitAnswer: SubmitHandler<IFormInput> = async (data: any) => {
        if (!checkAnswerCount()) return;

        if (answerList.length === 3) {
            for (let questionCnt = 1; questionCnt <= 3; questionCnt++) {
                let body: IAnswerFollwupQuestion = {
                    sequence: questionCnt,
                    question_id: questionList?.id,
                    answer: answerList?.[questionCnt - 1],
                };

                await submitAdditionalAnswer(body);
            }
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col pb-[3.6rem]">
                <div className="text-heading5 text-left">
                    <span className="text-blue-primary">Q.&nbsp;</span>
                    <span className="">{question}</span>
                </div>
            </div>
            <form onSubmit={handleSubmit(submitAnswer)}>
                <Textarea
                    type="short"
                    placeholder="자세히 입력할수록 좋아요"
                    register={register('followup_answer', { required: true })}
                />
                <button type="submit">다음</button>
            </form>
        </div>
    );
}
