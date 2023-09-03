'use client';

// 현재 페이지 쿼리스트링 params의 answer값 가져옴
import { createContext } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ParamProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const ParamContext = createContext({});
    const searchParams = useSearchParams();

    let cnt = parseInt(searchParams?.get('answer') ?? '1');

    return (
        <ParamContext.Provider value={cnt}>{children}</ParamContext.Provider>
    );
}
