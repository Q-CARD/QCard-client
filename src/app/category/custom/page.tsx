'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CategoryChips from '@/components/common/CategoryChips';
import { BsChevronRight } from 'react-icons/bs';
import { routeByUserAnswered } from '@/utils/routeByUserAnswered';
import { categoryKeyToName } from '@/utils/utils';
import { QUESTION_CATEGORY } from '@/constants';
import PlusIcon from '@/assets/icons/icons-plus.png';
import defaultImage from '@/assets/icons/icon-default-profile.png';

const dummy = [
    {
        questionId: 119,
        title: '네트워크 OSI 7계층에 대해서 설명해주세요.',
        category: 'CATEGORY_NW',
        type: 'TYPE_CUSTOM',
        account: {
            name: '네트워크 개발자',
            email: 'ashley@gmail.com',
        },
        isMine: true,
    },
    {
        questionId: 120,
        title: '내꺼아닌 커스텀',
        category: 'CATEGORY_OS',
        type: 'TYPE_CUSTOM',
        account: {
            name: '시연시연',
            email: 'ashleytest@gmail.com',
        },
        isMine: false,
    },
];

export default function CategoryCustomPage() {
    const [selectedCategory, setSelectedCategory] = useState<{
        id: Number;
        key: string;
    }>({
        id: QUESTION_CATEGORY[0].id,
        key: QUESTION_CATEGORY[0].key,
    });

    const selectCategory = (category: any) => {
        setSelectedCategory({
            id: category.id,
            key: category.key,
        });
    };

    return (
        <div className="w-full mb-[6rem] flex flex-col items-center gap-[5.8rem]">
            <div className="w-full h-[18rem] bg-blue-1 flex justify-center items-center">
                <span className="text-black text-heading2 mr-[28.2rem]">
                    미래의 동료가 생성한 큐카드를 살펴봐요
                </span>
                <Image
                    src={PlusIcon}
                    alt="plus-icon"
                    width={50}
                    height={50}
                    onClick={() => {}}
                    className="cursor-pointer"
                />
            </div>
            <div className="w-[93rem] flex flex-col">
                <CategoryChips
                    selectedCategory={selectedCategory}
                    selectCategory={selectCategory}
                />
                <div className="w-full h-[6rem]"></div>
                {dummy.map((question: any) => {
                    return (
                        <div
                            key={`custom-question-detail-card-${question.questionId}`}
                        >
                            <CustomQuestionDetailCard data={question} />
                            <hr className="w-full h-[0.2rem] my-[4.6rem] bg-grey-2" />
                        </div>
                    );
                })}
            </div>
            {/* TODO - 페이지네이션 */}
            <div></div>
        </div>
    );
}

// TODO - CustomQuestionCard, CustomQuestionDetailCard 네이밍 고민하기
// (현재는 QuestionCard, QuestionDetailCard 와 통일)
const CustomQuestionDetailCard = ({ data }: { data: any }) => {
    const { questionId, title, category, account } = data;

    const router = useRouter();

    return (
        <div
            className="w-full cursor-pointer"
            onClick={() => routeByUserAnswered(router, questionId)}
        >
            <div className="w-full pr-[2.5rem] py-[2.2rem] mb-[0.8rem] flex justify-between items-center gap-[1.5rem]">
                <span className="text-black text-heading3">{title}</span>
                <BsChevronRight size="24" color="var(--grey-6)" />
            </div>
            <div className="w-fit px-[2rem] py-[1.1rem] mb-[5.44rem] text-blue-primary text-[1.4rem] font-semibold bg-blue-1 rounded-[2.3rem]">
                {categoryKeyToName(category)}
            </div>
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
