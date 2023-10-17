// 검색 엔진 크롤러에게 웹 사이트의 url별 접근을 결정하는 파일
// 책에서 목차로 원하는 페이지를 바로 볼 수 있듯이, 어느 페이지를 방문하고 방문하지 않을지 결정할 수 있음
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://qcard.co.kr/sitemap.xml',
    };
}
