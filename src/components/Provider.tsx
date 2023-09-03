'use client';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MDXProvider } from '@mdx-js/react';

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <MDXProvider>{children}</MDXProvider>
                {children}
            </QueryClientProvider>
        </RecoilRoot>
    );
}
