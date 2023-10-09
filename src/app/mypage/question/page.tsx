'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import CategoryChips from '@/components/common/CategoryChips';
import { BsChevronRight } from 'react-icons/bs';
import { getQuestionsMe } from '@/api/questions';
import { routeByUserAnswered } from '@/utils/routeByUserAnswered';
import { QUESTION_CATEGORY } from '@/constants/data';
import FolerBlueImg from '@/assets/images/image-foler-blue.png';

export default function MyQuestionPage() {
    const [myQuestionList, setMyQuestionList] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState<{
        id: Number;
        key: string;
    }>({
        id: QUESTION_CATEGORY[0].id,
        key: QUESTION_CATEGORY[0].key,
    });

    useEffect(() => {
        loadAnswersMe();
    }, [selectedCategory]);

    const loadAnswersMe = async () => {
        try {
            const data = await getQuestionsMe(selectedCategory.key);

            setMyQuestionList(data.content);
        } catch (e) {}
    };

    const selectCategory = (category: any) => {
        setSelectedCategory({
            id: category.id,
            key: category.key,
        });
    };

    return (
        <div className="w-[79rem] h-[clac(100%-5.5rem)] ml-[10rem] my-[5.5rem] flex flex-col items-center gap-[4.8rem]">
            <CategoryChips
                selectedCategory={selectedCategory}
                selectCategory={selectCategory}
            />

            {myQuestionList.length ? (
                <div className="w-full flex flex-col gap-[4.6rem]">
                    {myQuestionList.map((question: any) => (
                        <MyQuestionCard
                            key={`question-card-${question.questionId}`}
                            data={question}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-[3.2rem]">
                    <Image
                        src={FolerBlueImg}
                        alt="img-foler-blue"
                        width={165}
                        height={165}
                    />
                    <span className="text-black text-specialHeading">
                        아직 나의 질문이 없어요!
                    </span>
                    <span className="text-grey-5 text-heading4">
                        나만의 큐카드를 만들어볼까요?
                    </span>
                </div>
            )}
        </div>
    );
}

const MyQuestionCard = ({ data }: { data: any }) => {
    const { questionId, title, category, type, account, isMine } = data;

    const router = useRouter();

    return (
        <div className="w-full px-[2.6rem] py-[3rem] bg-blue-1 rounded-[1rem] border-[0.2rem] border-blue-primary flex justify-between gap-[1.5rem]">
            <span className="text-black text-heading3">{title}</span>
            <BsChevronRight
                size="24"
                color="var(--grey-6)"
                className="cursor-pointer"
                onClick={() => {
                    routeByUserAnswered(router, questionId);
                }}
            />
        </div>
    );
};
