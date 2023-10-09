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
        <div className="w-full h-full py-[7.9rem] flex flex-col items-center">
            <div className="w-[93rem] mb-[6.2rem] flex">
                <span className="text-heading2 text-blue-primary">
                    {categoryInfo?.name}
                </span>
            </div>
            <div className="mx-auto flex flex-col">
                {categoryQuestions.map((question: IQuestion, idx: number) => {
                    return (
                        <div
                            key={`question-detail-card-${question.questionId}`}
                        >
                            <QuestionDetailCard questionInfo={question} />
                            {idx !== categoryQuestions.length - 1 && (
                                <hr className="w-full h-[0.2rem] my-[4.6rem] bg-grey-2" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
