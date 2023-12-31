'use client';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '@/store/recoil';
import { routeByUserAnswered } from '@/utils/routeByUserAnswered';

interface QuestionCardProps {
    question: {
        questionId: number;
        title: string;
        category: string;
    };
}

/**
 *
 * @description 카테고리 이미지 카드
 */
export function QuestionCard({ question }: QuestionCardProps) {
    const { questionId, title } = question;

    const router = useRouter();
    const isLogin = useRecoilValue(isLoginAtom);

    return (
        <div
            className="w-[36.8rem] h-[36.8rem] p-[4.85rem] shadow-3 rounded-[1.8rem] flex justify-center cursor-pointer"
            onClick={() => routeByUserAnswered(router, questionId)}
        >
            <span className="text-heading3 text-black text-center my-auto">
                {title}
            </span>
        </div>
    );
}
