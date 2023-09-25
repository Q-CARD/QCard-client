'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/common/Button';
import { getAnswersMe } from '@/api/answers';
import { IAnswer, IAnswerHearted } from '@/types/index';
import { QUESTION_CATEGORY } from '@/constants/data';

export default function MyAnswerPage() {
    const [myAnswerList, setMyAnswerList] = useState<IAnswerHearted[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<{
        id: Number;
        key: string;
    }>({
        id: QUESTION_CATEGORY[0].id,
        key: QUESTION_CATEGORY[0].key,
    });
    const [selectedCategoryList, setSelectedCategoryList] = useState<
        IAnswerHearted[]
    >([]);

    useEffect(() => {
        loadAnswersMe();
    }, []);

    useEffect(() => {
        setSelectedCategoryList(filteredDataBySelectedCategory);
    }, [selectedCategory]);

    const loadAnswersMe = async () => {
        try {
            const data = await getAnswersMe();

            setMyAnswerList(data);

            // TODO - 함수 위치 고민해보기. loadAnswersMe 함수는 두 가지 역할을 하는 중이지 않을까?
            setSelectedCategoryList(
                data.filter((item: IAnswerHearted) => {
                    return item.question.category === QUESTION_CATEGORY[0].key;
                }),
            );
        } catch (e) {}
    };

    const filteredDataBySelectedCategory = myAnswerList.filter(
        ({ question }: IAnswerHearted) => {
            return question.category === selectedCategory.key;
        },
    );

    const selectCategory = (category: any) => {
        setSelectedCategory({
            id: category.id,
            key: category.key,
        });
    };

    return (
        <div className="w-full h-full flex flex-col items-center gap-[3.4rem] mb-[3.4rem]">
            <div className="mx-[10.3rem] my-[2rem] flex justify-center flex-wrap gap-[2.8rem]">
                {QUESTION_CATEGORY.map((category) => (
                    <Button
                        key={`button-question-category-${category.id}`}
                        type="chip"
                        title={category.name}
                        onClick={() => selectCategory(category)}
                        isChipClicked={selectedCategory.id === category.id}
                    />
                ))}
            </div>
            {selectedCategoryList.map((answer: IAnswer) => (
                <AnswerCard
                    key={`answer-card-${answer.answerId}`}
                    data={answer}
                />
            ))}
        </div>
    );
}

const AnswerCard = ({ data }: { data: IAnswer }) => {
    const {
        answerId,
        type,
        account,
        content,
        heartCount,
        createdAt,
        modifiedAt,
        question,
    } = data;

    const categoryName = QUESTION_CATEGORY.find(({ key }) => {
        return key === question.category;
    })?.name;

    return (
        <div className="w-[68rem] px-[5rem] py-[3.14rem] rounded-[1.5702rem] border-[0.0785rem] border-grey-4 flex flex-col items-center">
            <div className="text-heading4 mb-[1.57rem]">{question.title}</div>
            <div className="text-[0.785rem] font-semibold text-white px-[1.1rem] py-[0.2rem] mb-[4.24rem] bg-blue-primary rounded-[1.57rem]">
                {categoryName}
            </div>
            <div className="text-bodySmaller text-grey-6">{content}</div>
        </div>
    );
};
