'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getInterviewAll } from '@/api/interview';

export default function MarkdownRenderer() {
    const [gptAnswer, setGptAnswer] = useState<string>('');

    const searchParams = useSearchParams();
    const paramsId = searchParams.get('id') ?? '1';

    const getInterview = async (paramsId: string) => {
        const data = await getInterviewAll(Number(paramsId));
        if (data) {
            setGptAnswer(data.gpt_answer);
        }
    };

    useEffect(() => {
        getInterview(paramsId);
    }, [paramsId]);

    return (
        <div>
            <ReactMarkdown
                children={
                    gptAnswer ?? 'gpt 답변이 없습니다 다시 한번 녹음해주세요 :)'
                }
                remarkPlugins={[remarkGfm]}
            />
        </div>
    );
}
