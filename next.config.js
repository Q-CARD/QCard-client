/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // 개발모드에서 두번 렌더링되는 것 방지
    serverActions: true,
};

module.exports = nextConfig;
