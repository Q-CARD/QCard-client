'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import CategoryChips from '@/components/common/CategoryChips';
import CustomQuestionModal from '@/components/CustomQuestionModal';
import { BsChevronRight } from 'react-icons/bs';
import { useModal } from '@/hooks/useModal';
import { routeByUserAnswered } from '@/utils/routeByUserAnswered';
import { categoryKeyToName } from '@/utils/utils';
import { QUESTION_CATEGORY } from '@/constants';
import PlusIcon from '@/assets/icons/icons-plus.png';
import defaultImage from '@/assets/icons/icon-default-profile.png';
import { getQuestions } from '@/api/questions';

export default function CategoryCustomPage() {
    const { isOpen, modalRef, openModal, closeModal } = useModal();

    const [customQuestionList, setCustomQuestionList] = useState([]);

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

    useEffect(() => {
        if (!isOpen) {
            loadCustomQuestions();
        }
    }, [selectedCategory, isOpen]);

    const loadCustomQuestions = async () => {
        const data = await getQuestions(selectedCategory.key, 'TYPE_CUSTOM');

        setCustomQuestionList(data.content);
    };

    return (
        <div className="w-full pb-[6rem]">
            <div className="flex flex-col items-center gap-[5.8rem]">
                <div className="w-full h-[18rem] py-[6.87rem] bg-blue-1 flex justify-center items-center">
                    <span className="text-black text-heading2 mr-[28.2rem]">
                        미래의 동료가 생성한 큐카드를 살펴봐요
                    </span>
                    <Image
                        src={PlusIcon}
                        alt="plus-icon"
                        width={50}
                        height={50}
                        onClick={() => {
                            isOpen === false && openModal();
                        }}
                        className="cursor-pointer"
                    />
                </div>
                <div className="w-[93rem] flex flex-col">
                    <CategoryChips
                        selectedCategory={selectedCategory}
                        selectCategory={selectCategory}
                    />
                    <div className="w-full h-[6rem]"></div>
                    {customQuestionList?.map((question: any) => {
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

                <div className={isOpen ? 'outside' : ''}>
                    <CustomQuestionModal
                        open={isOpen}
                        modalRef={modalRef}
                        closeModal={closeModal}
                    />
                </div>
            </div>
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
