'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getInterviewAll } from '@/api/interview';

export default function MarkdownRenderer() {
    const searchParams = useSearchParams();
    const interviewId = parseInt(searchParams.get('id') ?? '1');

    const { data } = useQuery({
        queryKey: ['interviewQuestions', interviewId],
        queryFn: () => getInterviewAll(interviewId),
    });
    return (
        <div>
            <ReactMarkdown
                children={
                    data?.gpt_answer ??
                    'gpt 답변이 없습니다 다시 한번 녹음해주세요 :)'
                }
                remarkPlugins={[remarkGfm]}
            />
        </div>
    );
}
