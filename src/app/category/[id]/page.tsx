'use client';

import { useEffect, useState } from 'react';

import { QuestionDetailCard } from '@/components/card/QuestionDetailCard';
import { getQuestionsCategory } from '@/api/questions';
import { IQuestion } from '@/types';
import { QUESTION_CATEGORY } from '@/constants/data';

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
            const data = await getQuestionsCategory(
                categoryInfo?.key as string,
            );

            setCategoryQuestions(data);
        } catch (e) {}
    };

    return (
        <div className="flex flex-col">
            <div className="ml-[10rem] mt-[3.5rem] mb-[2.2rem] flex flex-col gap-[1.6rem]">
                <div className="text-heading2 text-black">질문 모음집</div>
                <div className="text-heading3 text-blue-primary">
                    {categoryInfo?.name}
                </div>
            </div>
            <div className="mx-auto flex flex-col gap-[3.2rem]">
                {categoryQuestions.map((question: IQuestion) => {
                    return (
                        <QuestionDetailCard
                            key={`question-detail-card-${question.questionId}`}
                            questionInfo={question}
                        />
                    );
                })}
            </div>
        </div>
    );
}
