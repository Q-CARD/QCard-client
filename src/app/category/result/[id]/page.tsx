// 질문 상세 페이지_입력 후
'use client';

import { useRouter } from 'next/navigation';

import { TextBox } from '@/components/TextBox';
import { QUESTION_CATEGORY_DETAIL } from '@/constants/dummy';

export default function CategoryResultPage({
    params,
}: {
    params: { id: number };
}) {
    const router = useRouter();

    const questionTitle = QUESTION_CATEGORY_DETAIL.find(
        (question) => question.questionId === Number(params.id),
    )?.title;

    const dummyText =
        'Lorem ipsum dolor sit amet consectetur. Ullamcorper eget eu non mattis. Adipiscing ut pharetra diam amet parturient tristique aliquet ac vitae. Libero cursus lacus eu venenatis. Integer senectus eu arcu massa vitae quis. Eu diam justo dui viverra at scelerisque amet. Ipsum semper id et imperdiet nisi mattis sit nunc. Congue viverra sed ut dictumst consequat sit dictum. Et egestas dictumst convallis sem fringilla euismod in pellentesque porttitor. Amet integer volutpat id nam. Elementum id elementum scelerisque est. Orci orci tempor in vivamus integer non eget sollicitudin. Purus mauris urna tempor quam nunc egestas.';

    return (
        <div className="my-[12.8rem] flex flex-col items-center gap-[3.2rem]">
            <div className="text-specialHeading mb-[0.8rem]">
                <span className="text-blue-primary">Q. </span>
                <span>{questionTitle}</span>
            </div>
            <TextBox text={dummyText} />

            <div className="text-specialHeading mb-[0.8rem]">
                <span className="text-yellow-sub">A. </span>
                <span>'GPT의 답변이에요'</span>
            </div>
            <TextBox text={dummyText} />

            <div className="text-specialHeading mb-[0.8rem]">
                <span className="text-yellow-sub">A. </span>
                <span>'다른 사람들의 답변도 살펴볼까요?'</span>
            </div>
            <TextBox text={dummyText} />
            <TextBox text={dummyText} />
        </div>
    );
}
