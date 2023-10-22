'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import CategoryChips from './common/CategoryChips';
import { Button, Textarea } from './common';
import { QUESTION_CATEGORY } from '@/constants';
import { postQuestion } from '@/api/questions';

interface CustomQuestionModalProps {
    open: boolean;
    modalRef: React.RefObject<HTMLDivElement>;
    closeModal: () => void;
}

interface IModalForm {
    customQuestion: string;
}

// TODO - 영역박스 컴포넌트 분리

/**
 *
 * @description 커스텀 질문 등록 모달
 */
export default function CustomQuestionModal({
    open,
    modalRef,
    closeModal,
}: CustomQuestionModalProps) {
    const { register, handleSubmit, resetField } = useForm<IModalForm>();

    const [selectedCategory, setSelectedCategory] = useState<{
        id: number;
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
        resetModalInputs();
    }, [open]);

    const resetModalInputs = () => {
        setSelectedCategory({
            id: QUESTION_CATEGORY[0].id,
            key: QUESTION_CATEGORY[0].key,
        });

        resetField('customQuestion');
    };

    const handleSubmitQuestion: SubmitHandler<IModalForm> = async ({
        customQuestion,
    }: IModalForm) => {
        const payload = {
            title: customQuestion,
            category: selectedCategory.key,
        };

        try {
            const data = await postQuestion(payload);
        } catch (e) {
            alert('큐카드 생성에 실패했습니다.');
        } finally {
            closeModal();
        }
    };

    return (
        <div
            className={`w-[98rem] px-[13.5rem] py-[7.1rem] rounded-[1rem] bg-white flex flex-col ${
                open ? 'openedModal' : 'closedModal'
            }`}
            ref={modalRef}
        >
            <span className="text-grey-6 text-heading4">
                나만의 큐카드 만들기
            </span>
            <div className="w-full h-[3rem]"></div>
            <span className="text-grey-4 text-bodySmall">
                큐카드의 카테고리를 선택해주세요.
            </span>
            <div className="w-full h-[2rem]"></div>
            <CategoryChips
                selectedCategory={selectedCategory}
                selectCategory={selectCategory}
            />
            <div className="w-full h-[4rem]"></div>
            <Textarea
                placeholder="나만의 큐카드를 작성해주세요"
                register={register('customQuestion', {
                    required: true,
                })}
                style={{ width: '100%', height: '25rem' }}
            />
            <div className="w-full h-[4rem]"></div>
            <div className="flex justify-center">
                <Button
                    type="block"
                    title="작성하기"
                    onClick={handleSubmit(handleSubmitQuestion)}
                    disabled={false}
                />
            </div>
        </div>
    );
}
