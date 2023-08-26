// 어플리케이션 공통 레이아웃
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/utils/site';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/components/Header';

import '@/styles/global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
        'Tech Interview',
        'Next.js',
        'Mock Interview',
        'Chat GPT',
        'QCard',
    ],
    authors: [
        {
            name: 'hyosin-Jang',
            url: 'https://github.com/hyosin-Jang',
        },
        {
            name: 'Gaeun-Kwon',
            url: 'https://github.com/Gaeun-Kwon',
        },
    ],
    creator: 'hyosin-Jang',
};

// children prop이 nested layout로 들어감
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className="h-screen">
                <div className="h-full flex flex-col overflow-x-hidden">
                    <Header />
                    <main className="w-screen h-full mt-[11.2rem]">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
