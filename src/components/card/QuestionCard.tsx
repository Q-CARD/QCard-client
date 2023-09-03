import Link from 'next/link';

interface QuestionCardProps {
    question: {
        questionId: number;
        title: string;
        category: string;
    };
}

export function QuestionCard({ question }: QuestionCardProps) {
    const { questionId, title } = question;

    return (
        <Link
            className="w-[36.8rem] h-[36.8rem] p-[4.85rem] shadow-3 rounded-[1.8rem] flex justify-center cursor-pointer"
            href={`/category/question/${questionId}`}
        >
            <span className="text-heading3 text-black text-center my-auto">
                {title}
            </span>
        </Link>
    );
}
