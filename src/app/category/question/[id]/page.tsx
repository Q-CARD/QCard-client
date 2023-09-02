// 질문 상세 페이지_입력 전
'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button';
import { Textarea } from '@/components/Textarea';
import { QUESTION_CATEGORY_DETAIL } from '@/constants/dummy';

export default function CategoryQuestionPage({
    params,
}: {
    params: { id: number };
}) {
    const router = useRouter();

    const questionTitle = QUESTION_CATEGORY_DETAIL.find(
        (question) => question.questionId === Number(params.id),
    )?.title;

    const submitAnswer = () => {
        // TODO - api 답변 제출
        router.push(`/category/result/${params.id}`);
    };

    return (
        <div className="my-[12.8rem] flex flex-col items-center gap-[3.2rem]">
            <div className="text-specialHeading mb-[0.8rem]">
                <span className="text-blue-primary">Q. </span>
                <span>{questionTitle}</span>
            </div>
            <Textarea placeholder="자세히 입력할 수록 좋아요" />
            <Button type="block" title="등록하기" onClick={submitAnswer} />
        </div>
    );
}
