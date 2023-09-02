import { QuestionDetailCard } from '@/components/card/QuestionDetailCard';
import { IQuestion } from '@/types';
import { QUESTION_CATEGORY } from '@/constants/data';
import { QUESTION_CATEGORY_DETAIL } from '@/constants/dummy';

export default function CategoryDetailPage({
    params,
}: {
    params: { id: number };
}) {
    const categoryName = QUESTION_CATEGORY.find(
        (category) => category.id === Number(params.id),
    )?.name;

    return (
        <div className="flex flex-col">
            <div className="ml-[10rem] mt-[3.5rem] mb-[2.2rem] flex flex-col gap-[1.6rem]">
                <div className="text-heading2 text-black">질문 모음집</div>
                <div className="text-heading3 text-blue-primary">
                    {categoryName}
                </div>
            </div>
            <div className="mx-auto flex flex-col gap-[3.2rem]">
                {QUESTION_CATEGORY_DETAIL.map((question: IQuestion) => {
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
