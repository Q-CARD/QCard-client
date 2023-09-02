'use client';

import { Button } from '@/components/Button';
import { QUESTION_CATEGORY, ANSWERS_ME } from '@/constants/data';
import { IAnswer } from '@/types/answer';
import { useState } from 'react';

export default function MyAnswerPage() {
    const [selectedCategory, setSelectedCategory] = useState<number>(
        QUESTION_CATEGORY[0].id,
    );

    const selectCategory = (categoryId: number) => {
        setSelectedCategory(categoryId);
    };

    const filteredAnswers = ANSWERS_ME.filter(
        (answer) => answer.answerId === selectedCategory,
    );

    return (
        <div className="w-full h-full flex flex-col items-center gap-[3.4rem] mb-[3.4rem]">
            <div className="mx-[10.3rem] my-[2rem] flex justify-center flex-wrap gap-[2.8rem]">
                {QUESTION_CATEGORY.map((category) => (
                    <Button
                        type="chip"
                        title={category.name}
                        onClick={() => selectCategory(category.id)}
                        isChipClicked={selectedCategory === category.id}
                    />
                ))}
            </div>
            {filteredAnswers.map((answer: IAnswer) => (
                <AnswerCard data={answer} />
            ))}
        </div>
    );
}

const AnswerCard = ({ data }: { data: IAnswer }) => {
    // TODO - title , category 추가 요청
    const {
        answerId,
        type,
        account,
        content,
        heartCount,
        createdAt,
        modifiedAt,
    } = data;

    return (
        <div className="w-[68rem] px-[5rem] py-[3.14rem] rounded-[1.5702rem] border-[0.0785rem] border-grey-4 flex flex-col items-center">
            <div className="text-heading4 mb-[1.57rem]">
                {'네트워크 OSI 7계층에 대해 설명해주세요.'}
            </div>
            <div className="text-[0.785rem] font-semibold text-white px-[1.1rem] py-[0.2rem] mb-[4.24rem] bg-blue-primary rounded-[1.57rem]">
                {'네트워크'}
            </div>
            <div className="text-bodySmaller text-grey-6">{content}</div>
        </div>
    );
};
