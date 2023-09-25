// 모의 면접 모드 꼬리질문 페이지 interview/followup?id={id}&answer={answer}
'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Textarea } from '@/components/common/Textarea';
import { AiOutlineRight } from 'react-icons/ai';
import { getInterviewAll, submitAdditionalAnswer } from '@/api/interview';
import { IAnswerInterview, IAnswerFollwupQuestion } from '@/types';
import { useRecoilValue } from 'recoil';
import { interviewIdAtom } from '@/store/recoil';

interface IFormInput {
    followup_answer: string;
}

export default function InterviewFollowupPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const DEFAULT_QUESTION = '[NULL] 꼬리질문이 없습니다';
    const FOLLOWUP_QUESTION_COUNT = 3;
    const ANSWER_REGISTER_KEY = 'followup_answer';

    const interviewId: number = parseInt(searchParams?.get('id') ?? '1');
    const answer = parseInt(searchParams?.get('answer') ?? '1');

    const { register, watch, handleSubmit, reset } = useForm<IFormInput>();

    // TODO: types 리팩토링
    const [questionList, setQuestionList] = React.useState<IAnswerInterview>();
    const [questionCount, setQuestionCount] = React.useState<number>(1);
    const [answerList, setAnswerList] = React.useState<string[]>([]);
    const [disabled, setDisabled] = React.useState<boolean>(true);

    const followupRegEx = new RegExp(`additional_question_${questionCount}`);

    const idArr: number[] = useRecoilValue(interviewIdAtom);

    const getAllInterviewInfo = async () => {
        let data = await getInterviewAll(interviewId);
        if (data) {
            setQuestionList(data);
        }
    };

    React.useEffect(() => {
        getAllInterviewInfo();
    }, []);

    // 답변 제출 후 다음 질문 세팅
    React.useEffect(() => {
        getNextQuestion();
        // api fetch 후 받아온 데이터 questionList 세팅
    }, [questionCount, questionList]);

    React.useEffect(() => {
        let isFillin = watch(ANSWER_REGISTER_KEY).length > 0;
        setDisabled(!isFillin);
    }, [watch(ANSWER_REGISTER_KEY)]);

    const saveAndResetAnswer = (formInput: IFormInput) => {
        if (answerList.length < FOLLOWUP_QUESTION_COUNT - 1) {
            setAnswerList([...answerList, formInput?.followup_answer]);
            reset();
            return false;
        }
        return true;
    };

    // TODO: default answer 등록하기
    const getNextQuestion = (): string => {
        if (questionList) {
            let questionKey: keyof IAnswerInterview = Object.keys(
                questionList,
            ).find((el) => followupRegEx.test(el)) as keyof IAnswerInterview;
            return questionList[questionKey] as string;
        }
        return DEFAULT_QUESTION;
    };

    const submitAnswer: SubmitHandler<IFormInput> = async (
        formInput: IFormInput,
    ) => {
        if (!saveAndResetAnswer(formInput)) return;

        for (
            let questionCount = 1;
            questionCount <= FOLLOWUP_QUESTION_COUNT;
            questionCount++
        ) {
            let body: IAnswerFollwupQuestion = {
                sequence: questionCount,
                question_id: questionList?.id,
                answer:
                    questionCount == FOLLOWUP_QUESTION_COUNT
                        ? watch(ANSWER_REGISTER_KEY) // 마지막은 state에 안 담긴 상태
                        : answerList?.[questionCount - 1],
            };

            await submitAdditionalAnswer(body);
        }
    };

    const handleNextButtonClick = () => {
        answerList.length == FOLLOWUP_QUESTION_COUNT - 1
            ? router.push(
                  `/interview/result?id=${idArr?.[answer]}&answer=${answer}`,
              )
            : setQuestionCount((cnt) => cnt + 1);
    };

    const getNextButtonText = () =>
        answerList.length == FOLLOWUP_QUESTION_COUNT - 1
            ? `${answer}번 질문으로 돌아가기`
            : '다음 질문';

    return (
        <section className="flex flex-col items-center m-auto text-center">
            <div className="self-end bg-blue-primary rounded-t-[1rem] py-[1.1rem] px-[3.6rem]">
                <span className="text-heading3 text-white">
                    {questionCount}. 꼬리 질문
                </span>
            </div>
            <form onSubmit={handleSubmit(submitAnswer)}>
                <div className="flex flex-col bg-white items-center rounded-[1rem] px-[4.9rem] py-[4.9rem] gap-[3.6rem] self-stretch">
                    <h1 className="text-heading3 text-grey-5 break-keep">
                        {questionList?.question_model?.title}
                    </h1>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col pb-[3.6rem]">
                            <div className="text-heading5 text-left">
                                <span className="text-blue-primary">
                                    Q.&nbsp;
                                </span>
                                <span className="">
                                    {getNextQuestion() ?? DEFAULT_QUESTION}
                                </span>
                            </div>
                        </div>

                        {/** TODO: textarea width, height 변경 */}
                        <Textarea
                            placeholder="자세히 입력할 수록 좋아요"
                            register={register('followup_answer', {
                                required: true,
                            })}
                        />
                    </div>
                </div>
                <div className="mt-[3.6rem]">
                    <button
                        type="submit"
                        disabled={disabled}
                        className={`${
                            disabled
                                ? 'bg-grey-3 text-grey-6'
                                : 'bg-blue-primary text-white'
                        } flex w-full justify-center items-center gap-[2px] rounded-[1rem] px-[5.6rem] py-[2.3rem]`}
                        onClick={handleNextButtonClick}
                    >
                        <span className="text-heading3">
                            {getNextButtonText()}
                        </span>
                        <AiOutlineRight size={25} />
                    </button>
                </div>
            </form>
        </section>
    );
}
