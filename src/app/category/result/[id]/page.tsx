'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { getQuestionById } from '@/api/questions';
import { IAnswerHearted, IQuestion } from '@/types';
import defaultImage from '@/assets/icons/icon-default-profile.png';
import ThumbsUpIcon from '@/assets/icons/icon-thumbsup.png';
import ThumbsUpFillIcon from '@/assets/icons/icon-thumbsup-fill.png';
import Image from 'next/image';
import { deleteHearts, postHearts } from '@/api/hearts';
import FolerOrangeImg from '@/assets/images/image-foler-orange.png';

/**
 * @description 질문모음 > 개별 질문 페이지 (입력 후)
 */
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
            const data = await getQuestionById(Number(params.id), 'SORT_HEART');

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

    const toggleHeart = async (answerId: number, isHearted: boolean) => {
        try {
            if (isHearted) {
                const data = await deleteHearts(answerId);

                if (data.answerId) {
                    alert('좋아요를 취소했습니다.');
                }
            } else {
                const data = await postHearts(answerId);

                if (data.answerId) {
                    alert('좋아요를 눌렀습니다.');
                }
            }
        } catch (e) {
        } finally {
            loadQuestionDetail();
        }
    };

    return (
        <div className="w-full py-[6.8rem]">
            <div className="flex justify-center">
                <div className="w-[70rem] flex flex-col gap-[9.5rem]">
                    <div className="flex flex-col gap-[5.2rem]">
                        <div className="text-specialHeading mb-[0.8rem]">
                            <span className="text-blue-primary">Q.&nbsp;</span>
                            <span>{questionInfo?.title}</span>
                        </div>
                        <div className="h-fit p-[3.2rem] text-bodySmall text-black rounded-[1rem] border-[0.3rem] border-blue-3">
                            {myAnswer?.content ?? '답변 없음'}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[5.2rem]">
                        <div className="text-specialHeading mb-[0.8rem]">
                            <span className="text-yellow-sub">A.&nbsp;</span>
                            <span>GPT의 답을 확인해보세요</span>
                        </div>
                        <div className="h-fit p-[3.2rem] text-bodySmall text-black bg-yellow-1 rounded-[1rem] border-[0.3rem] border-yellow-3">
                            <ReactMarkdown
                                children={
                                    gptAnswer?.content ?? 'gpt 답변이 없습니다.'
                                }
                                remarkPlugins={[remarkGfm]}
                            />
                        </div>
                    </div>

                    <hr className="h-[0.2rem] bg-grey-4" />

                    <div className="flex flex-col gap-[5.2rem]">
                        <div className="text-specialHeading mb-[0.8rem]">
                            <span className="text-yellow-sub">A.&nbsp;</span>
                            <span>동료들의 답변도 살펴보세요</span>
                        </div>
                        {otherAnswersList.length > 0 ? (
                            otherAnswersList.map((answer: IAnswerHearted) => {
                                return (
                                    <OtherAnswerCard
                                        key={`other-answer-${answer.answerId}`}
                                        data={answer}
                                        toggleHeart={toggleHeart}
                                    />
                                );
                            })
                        ) : (
                            <div className="flex flex-col items-center gap-[3.2rem]">
                                <Image
                                    src={FolerOrangeImg}
                                    alt="img-foler-pink"
                                    width={165}
                                    height={165}
                                />
                                <span className="text-grey-5 text-heading4">
                                    아직 등록된 동료들의 답변이 없어요.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function OtherAnswerCard({
    data,
    toggleHeart,
}: {
    data: any;
    toggleHeart: (answerId: number, isHearted: boolean) => void;
}) {
    const {
        answerId,
        type,
        account,
        content,
        heartCount,
        createdAt,
        modifiedAt,
        isHearted,
        isMine,
    } = data;

    return (
        <div className="flex flex-col gap-[3rem]">
            <div className="min-h-[7rem] flex items-center gap-[2.6rem]">
                <div className="flex items-center gap-[1rem]">
                    <div
                        style={{
                            display: 'flex',
                            position: 'relative',
                            width: '7rem',
                            height: '7rem',
                            cursor: 'pointer',
                        }}
                    >
                        <Image
                            src={account.profile ?? defaultImage}
                            alt="profile-image"
                            fill
                            sizes="7rem"
                            style={{
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                    <span className="ml-[2.4rem] text-bodyDefault text-grey-6">
                        {account.name}
                    </span>
                </div>
                <div className="w-[0.2rem] h-[2.8rem] bg-grey-4"></div>
                {isHearted ? (
                    <Image
                        src={ThumbsUpFillIcon}
                        alt="thumbsupfill-icon"
                        width={28}
                        height={28}
                        className="cursor-pointer"
                        onClick={() => toggleHeart(answerId, true)}
                    />
                ) : (
                    <Image
                        src={ThumbsUpIcon}
                        alt="thumbsup-icon"
                        width={28}
                        height={28}
                        className="cursor-pointer"
                        onClick={() => toggleHeart(answerId, false)}
                    />
                )}
                <span className="text-grey-5 text-[1.8rem] font-semibold leading-[2.4rem]">
                    {heartCount}
                </span>
            </div>

            <div className="h-fit p-[3.2rem] text-bodySmall text-black bg-blue-1 rounded-[1rem] border-[0.3rem] border-blue-3">
                {data.content}
            </div>
        </div>
    );
}
