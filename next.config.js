/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // using external images
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                port: '',
                pathname: '/**',
            },
        ],
    },
    reactStrictMode: false, // 개발모드에서 두번 렌더링되는 것 방지
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    serverActions: true,
    experimental: {
        mdxRs: true,
    },
};

const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);
