// 어플리케이션 공통 레이아웃
import type { Metadata } from 'next';
import { siteConfig } from '@/utils/site';
import GoogleAnalytics from './GoogleAnalytics';

import Providers from '@/components/adapter/Provider';
import { Header } from '@/components/common/Header';
import '@/styles/global.css';
import 'animate.css'; // 아코디언 애니메이션

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    icons: {
        icon: '/favicon.ico',
    },
    description: siteConfig.description,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    keywords: [
        'Tech Interview',
        'Self Interview Practice',
        'Next.js',
        'Mock Interview',
        'Chat GPT',
        'Whisper API',
        'QCard',
        'Tailwind CSS',
        'Server Components',
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
    openGraph: {
        // openGraph는 SNS로 공유될 때 표시되는 내용
        type: 'website',
        locale: 'ko_KR', // 사이트 언어 선택 - 기본은 en-US
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description, // 사이트 설명
        siteName: siteConfig.name,
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
        creator: 'hyosin-Jang',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // 서버와 클라이언트 데이터가 다른 경우 경고 해제
        <html lang="ko" suppressHydrationWarning>
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
                />
                <link rel="icon" href="./favicon.ico" />
            </head>
            <body className="min-h-screen">
                <GoogleAnalytics />
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
