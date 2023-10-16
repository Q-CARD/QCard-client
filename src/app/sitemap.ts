// sitemap.xml: 검색 엔진 크롤러에게 웹 사이트 구조를 제공
// 모든 url을 설정하고 페이지별 우선순위를 알려줄 수 있음
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: 'https://qcard.co.kr' },
        { url: 'https://qcard.co.kr/interview' },
        { url: 'https://qcard.co.kr/interview/question' },
        { url: 'https://qcard.co.kr/category' },
        { url: 'https://qcard.co.kr/category/question' },
        { url: 'https://qcard.co.kr/auth/login' },
        { url: 'https://qcard.co.kr/auth/signup' },
        { url: 'https://qcard.co.kr/mypage' },
        { url: 'https://qcard.co.kr/mypage/answer' },
        { url: 'https://qcard.co.kr/mypage/question' },
        { url: 'https://qcard.co.kr/mypage/profile' },
    ];
}
