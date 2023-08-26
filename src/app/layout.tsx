// 어플리케이션 공통 레이아웃
import type { Metadata } from 'next';
import { siteConfig } from '@/utils/site';

import Providers from '@/components/Provider';
import { Header } from '@/components/Header';
import '@/styles/global.css';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // 서버와 클라이언트 데이터가 다른 경우 경고 해제
        <html lang="ko" suppressHydrationWarning>
            <head />
            <body className="min-h-screen">
                <Providers>
                    <div className="flex flex-col h-full overflow-x-hidden">
                        <Header />
                        <main className="w-screen h-full mt-[11.2rem]">
                            {children}
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
