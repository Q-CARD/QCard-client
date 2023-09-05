'use client';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '@/store/recoil';

interface QuestionCardProps {
    question: {
        questionId: number;
        title: string;
        category: string;
    };
}

export function QuestionCard({ question }: QuestionCardProps) {
    const { questionId, title } = question;

    const router = useRouter();
    const isLogin = useRecoilValue(isLoginAtom);

    // path 진입 전 로그인 여부 검사
    const beforeEnter = (path: string) => {
        if (isLogin) {
            router.push(path);
        } else {
            alert('로그인이 필요한 기능입니다');
            router.push('/auth/login');
        }
    };

    return (
        <div
            className="w-[36.8rem] h-[36.8rem] p-[4.85rem] shadow-3 rounded-[1.8rem] flex justify-center cursor-pointer"
            onClick={() => beforeEnter(`/category/question/${questionId}`)}
        >
            <span className="text-heading3 text-black text-center my-auto">
                {title}
            </span>
        </div>
    );
}
