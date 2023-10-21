'use client';

import { useEffect, useState } from 'react';

import { QuestionDetailCard } from '@/components/card/QuestionDetailCard';
import { getQuestions } from '@/api/questions';
import { IQuestion } from '@/types';
import { QUESTION_CATEGORY } from '@/constants/data';

/**
 * @description 질문모음 > 개별 카테고리 페이지
 */
export default function CategoryDetailPage({
    params,
}: {
    params: { id: number };
}) {
    const categoryInfo = QUESTION_CATEGORY.find(
        (category) => category.id === Number(params.id),
    );

    const [categoryQuestions, setCategoryQuestions] = useState([]);

    useEffect(() => {
        loadCategoryQuestions();
    }, []);

    const loadCategoryQuestions = async () => {
        try {
            const data = await getQuestions(categoryInfo?.key);

            setCategoryQuestions(data.content);
        } catch (e) {}
    };

    return (
        <div className="w-full pt-[7.9rem] pb-[8.45rem]">
            <div className="flex flex-col items-center">
                <div className="w-[93rem] mb-[6.2rem] flex">
                    <span className="text-heading2 text-blue-primary">
                        {categoryInfo?.name}
                    </span>
                </div>
                <div className="mx-auto flex flex-col mb-[calc(5rem-4.6rem)]">
                    {categoryQuestions.map((question: IQuestion) => {
                        return (
                            <div
                                key={`question-detail-card-${question.questionId}`}
                            >
                                <QuestionDetailCard questionInfo={question} />
                                <hr className="w-full h-[0.2rem] my-[4.6rem] bg-grey-2" />
                            </div>
                        );
                    })}
                </div>
                {/* TODO - 페이지네이션 */}
                <div></div>
            </div>
        </div>
    );
}
