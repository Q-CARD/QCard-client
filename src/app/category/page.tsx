'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { CategoryCard } from '@/components/card/CategoryCard';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { getQuestions } from '@/api/questions';
import { categoryKeyToName } from '@/utils/utils';
import { ICategory } from '@/types';
import { QUESTION_CATEGORY } from '@/constants/data';
import defaultImage from '@/assets/icons/icon-default-profile.png';
import { routeByUserAnswered } from '@/utils/routeByUserAnswered';

/**
 * @description 질문 모음 페이지
 */
export default function CategoryPage() {
    const router = useRouter();

    const [customQuestionList, setCustomQuestionList] = useState([]);

    useEffect(() => {
        loadCustomQuestions();
    }, []);

    const loadCustomQuestions = async () => {
        try {
            const data = await getQuestions('', 'TYPE_CUSTOM', false);

            setCustomQuestionList(data.content);
        } catch (e) {}
    };

    return (
        <div className="w-full">
            <div className="bg-white px-[15.4rem] pt-[9.8rem] pb-[5.5rem] flex flex-col gap-[6rem]">
                <span className="text-black text-heading2">
                    카테고리별 큐카드를 사용해 면접을 연습해요
                </span>
                <div className="flex flex-wrap gap-[4rem]">
                    {QUESTION_CATEGORY.map((category: ICategory) => (
                        <CategoryCard
                            key={`category-card-${category.id}`}
                            categoryInfo={category}
                        />
                    ))}
                </div>
            </div>

            <div className="bg-blue-1 px-[15.4rem] pt-[8.1rem] pb-[9.2rem] flex flex-col gap-[6rem]">
                <div className="flex justify-between items-center mb-[6rem]">
                    <span className="text-black text-heading2">
                        미래의 동료가 생성한 큐카드를 살펴봐요
                    </span>
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                            router.push('/category/custom');
                        }}
                    >
                        <span className="text-blue-primary text-heading3">
                            더보기
                        </span>
                        <MdKeyboardArrowRight
                            size="34"
                            color="var(--primary-blue)"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-[4rem]">
                    {customQuestionList?.map((question: any) => (
                        <CustomQuestionCard
                            key={`category-card-${question.questionId}`}
                            data={question}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

const CustomQuestionCard = ({ data }: { data: any }) => {
    const { questionId, title, category, account } = data;

    const router = useRouter();

    return (
        <div
            className="w-[54.7rem] pl-[3rem] pr-[3.5rem] py-[2rem] bg-white rounded-[0.5rem] shadow-buttonColor2 cursor-pointer flex flex-col gap-[1.8rem]"
            onClick={() => {
                routeByUserAnswered(router, questionId);
            }}
        >
            <span className="text-grey-6 text-heading3 font-normal">
                {title}
            </span>
            <div className="w-fit px-[2rem] py-[1.1rem] text-blue-primary text-[1.4rem] font-semibold bg-blue-1 rounded-[2.3rem]">
                {categoryKeyToName(category)}
            </div>
            <hr className="w-full h-[0.2rem] bg-grey-2" />
            <div className="flex items-center gap-[2.4rem]">
                <div
                    style={{
                        display: 'flex',
                        position: 'relative',
                        width: '5rem',
                        height: '5rem',
                        cursor: 'pointer',
                    }}
                >
                    <Image
                        src={account.profile ?? defaultImage}
                        alt="profile-image"
                        fill
                        sizes="5rem"
                        style={{
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <span className="text-grey-6 text-[2rem] font-semibold">
                    {account.name}
                </span>
            </div>
        </div>
    );
};
