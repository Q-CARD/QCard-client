// 면접모드 시작 /interview
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import CategoryNameCard from '@/components/interview/CategoryNameCard';
import { newInterview } from '@/api/interview';

import { QUESTION_CATEGORY } from '@/constants/data';
import { useSetRecoilState } from 'recoil';
import {
    categoryListAtom,
    interviewListAtom,
    interviewIdAtom,
} from '@/store/recoil';
import { IAnswerInterview, IUserInterview } from '@/types';

export default function InterviewPage() {
    const [categoryList, setCategoryList] = React.useState<string[]>([]);
    const setCategoryListAtom = useSetRecoilState(categoryListAtom);
    const setInterviewListAtom = useSetRecoilState(interviewListAtom);
    const setInterviewIdAtom = useSetRecoilState(interviewIdAtom);

    const router = useRouter();

    const handleCategoryList = (
        category: string | undefined,
        isChecked: boolean,
    ) => {
        console.log('category', category);
        if (categoryList.length === 3 && !isChecked) {
            alert('최대 3개까지만 선택이 가능합니다!');
            return;
        }
        if (categoryList.includes(category ?? '')) {
            setCategoryList([...categoryList.filter((el) => el !== category)]);
        } else {
            setCategoryList([...categoryList, category as string]);
        }
    };
    const getQuestionIdObject = (interviewArr: IAnswerInterview[]) => {
        let idArr: number[] = [];
        interviewArr.forEach(
            (question: IAnswerInterview, idx: number) =>
                (idArr[idx + 1] = question?.id),
        );
        setInterviewIdAtom(idArr);
    };

    const handleInterviewStart = async () => {
        let body = categoryList.map(
            (category) =>
                QUESTION_CATEGORY.find((question) => question.name === category)
                    ?.key,
        );

        if (!body || body.length === 0) return;

        // 체크 리스트 Recoil에 저장
        setCategoryListAtom(body as string[]);

        try {
            let data: IUserInterview = await newInterview(body as string[]);
            if (data) {
                setInterviewListAtom(data.question);
                getQuestionIdObject(data.question);
            }
        } catch {}

        const pathname = `/interview/question?question=1`;
        router.replace(pathname);
    };

    return (
        <section className="flex flex-col items-center bg-blue-1 justify-center pt-[8.3rem] min-w-[86rem] m-auto pb-[17.3rem] ">
            <h1 className="text-center text-heading2 font-bold">
                모의 면접을 시작해볼까요?
            </h1>
            <h3 className="text-heading3 mt-[4rem] text-grey-6">
                먼저 연습하고 싶은 면접 유형들을 선택해주세요
            </h3>

            <div className="flex flex-col items-center mx-[15.9rem] pt-[8.4rem] m-auto">
                <div className="flex items-start justify-center content-start flex-wrap w-[112.2rem] gap-x-[3.4rem] gap-y-[2.5rem]">
                    {QUESTION_CATEGORY.map(({ id, name }) => (
                        <CategoryNameCard
                            key={id}
                            handleCategoryList={handleCategoryList}
                            isCheckableNum={categoryList.length}
                        >
                            {name}
                        </CategoryNameCard>
                    ))}
                </div>
                <button
                    onClick={handleInterviewStart}
                    className="flex justify-center w-[93rem] h-[8rem] mt-[6.4rem] py-[2.3rem] bg-blue-primary rounded-[1rem]"
                >
                    <span className="text-heading3 text-white">
                        모의 면접 시작하기
                    </span>
                </button>
            </div>
        </section>
    );
}
