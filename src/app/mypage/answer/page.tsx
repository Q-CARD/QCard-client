'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import CategoryChips from '@/components/common/CategoryChips';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';

import { getAnswersMe } from '@/api/answers';
import { IAnswer, IAnswerHearted } from '@/types';
import { QUESTION_CATEGORY } from '@/constants/data';
import FolerPinkImg from '@/assets/images/image-foler-pink.png';

export default function MyAnswerPage() {
    const [myAnswerList, setMyAnswerList] = useState<IAnswerHearted[]>([]);

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
            const data = await getAnswersMe(selectedCategory.key);

            setMyAnswerList(data);
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

            {myAnswerList.length ? (
                <div className="w-full flex flex-col gap-[4.6rem]">
                    {myAnswerList.map((answer: any) => (
                        <MyAnswerCard
                            key={`answer-card-${answer.answerId}`}
                            data={answer}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-[3.2rem]">
                    <Image
                        src={FolerPinkImg}
                        alt="img-foler-pink"
                        width={165}
                        height={165}
                    />
                    <span className="text-black text-specialHeading">
                        아직 나의 답변이 없어요!
                    </span>
                    <span className="text-grey-5 text-heading4">
                        큐카드와 면접을 연습해볼까요?
                    </span>
                </div>
            )}
        </div>
    );
}

const MyAnswerCard = ({ data }: { data: any }) => {
    // TODO - type 정리
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

    const router = useRouter();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleToggleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    const moveToDetailPage = (e: React.MouseEvent<HTMLDivElement>) => {
        router.push(`/category/result/${question.id}`);
    };

    return (
        <div
            className="w-full p-[2.5rem] bg-yellow-1 rounded-[1.5702rem] border-[0.2rem] border-yellow-sub flex flex-col items-center gap-[2rem]"
            onClick={moveToDetailPage}
        >
            <div className="w-full flex justify-between">
                <span className="text-heading4">{question.title}</span>
                <div onClick={handleToggleClick}>
                    {isOpen ? (
                        <BsChevronDown
                            size="24"
                            color="var(--grey-6)"
                            className="cursor-pointer"
                        />
                    ) : (
                        <BsChevronRight
                            size="24"
                            color="var(--grey-6)"
                            className="cursor-pointer"
                        />
                    )}
                </div>
            </div>
            <span className="w-full text-bodySmall text-grey-6 break-all">
                {isOpen ? content : `${content.slice(0, 386)}...`}
            </span>
        </div>
    );
};
