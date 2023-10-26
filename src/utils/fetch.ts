// fetch.ts
import wretch, { Wretch, WretchResponse } from 'wretch';
import { CONSTANTS } from '@/constants/common';
import FormDataAddon from 'wretch/addons/formData';
import QueryStringAddon from 'wretch/addons/queryString';
import { getAccountsLogout, getAccountsReissue } from '@/api/accounts';
import { useRouter } from 'next/navigation';
import { setCookie, getCookie, getCookies, deleteCookie } from 'cookies-next';

let token = null;
let refreshToken = null;

// client - 브라우저 동작 테스트
if (typeof window !== 'undefined') {
    // execute only client side
    token = getCookie(CONSTANTS.ACCESS_TOKEN);
    refreshToken = getCookie(CONSTANTS.REFRESH_TOKEN);
    console.log('[client] accessToken', token);
    console.log('[client] refreshToken', refreshToken);
}

// server - 서버 동작 테스트
// TODO: 클라이언트 번들에 아래 코드 포함되는 것 불필요
// https://github.com/andreizanik/cookies-next/issues/44
if (typeof window === 'undefined') {
    // console.log('read all cookies', getCookies()); => {} 빈 객체 리턴
    token = getCookie(CONSTANTS.ACCESS_TOKEN);
    refreshToken = getCookie(CONSTANTS.REFRESH_TOKEN);
    console.log('[server] accessToken', token);
    console.log('[server] refreshToken', refreshToken);
}
const api = wretch(process.env.NEXT_PUBLIC_API_BASE_URL)
    .auth(`${token}`)
    .errorType('json')
    .addon(QueryStringAddon)
    .addon(FormDataAddon)
    .resolve((r) => r.json() as any);

const reIssueApi = wretch(process.env.NEXT_PUBLIC_API_BASE_URL)
    .auth(`${refreshToken}`)
    .errorType('json')
    .resolve((r) => r.json() as any);

interface Props {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    url: string;
    query?: string;
    params?: { type: string };
    body?: any;
}

type WretchError = Error & {
    status: number;
    response: WretchResponse;
    text?: string;
    json?: Object;
};

// 에러 메시지 출력 함수
const printErrorMsg = (error: WretchError) => {
    // empty object인 경우 status text를 출력
    console.log(
        'error.message',
        error.message,
        'error.status',
        error.status,
        typeof error.message === 'object' &&
            Object.keys(error.message).length > 0,
    );

    console.log('error.response.statusText;', error.response.statusText);
    const message =
        typeof error.message === 'object' &&
        Object.keys(error.message).length > 0
            ? JSON.stringify(error.message)
            : error.response.statusText;
    console.error(`${error.status}: ${message}`);
};

const errorHandler = async (error: WretchError, originalRequest: any) => {
    console.log('[error handler]', error.status);

    printErrorMsg(error);

    try {
        const data = await getAccountsReissue();

        if (data) {
            setCookie(CONSTANTS.ACCESS_TOKEN, data.accessToken);
            setCookie(CONSTANTS.REFRESH_TOKEN, data.refreshToken);

            return originalRequest.auth(data.accessToken).fetch().json();
        }
    } catch (e) {
        const data = await getAccountsLogout();
        if (data) {
            alert('유효하지 않은 토큰입니다.');
            deleteCookie(CONSTANTS.ACCESS_TOKEN);
            deleteCookie(CONSTANTS.REFRESH_TOKEN);
            useRouter().push('/');
        }
    }
};

const fetchWrap = ({ method, url, query, params, body }: Props) => {
    try {
        const data =
            (method === 'get' &&
                query &&
                api
                    .query(query)
                    .options({
                        next: {
                            revalidate: 10, // 캐시 수명 테스트
                        },
                    })
                    .get(url)) ||
            (method === 'get' && api.get(url)) ||
            (method === 'post' && api.url(url).post(body)) ||
            (method === 'put' &&
                params &&
                params.type === 'record' &&
                api.formData(body).url(url).put()) ||
            (method === 'put' && api.url(url).put(body))(
                method === 'patch' && api.url(url).patch(body),
            ) ||
            (method === 'delete' && api.delete(url)) ||
            {};

        console.log('[res.data] ', data);
        return data.catch((error: any, originalRequest: any) =>
            errorHandler(error, originalRequest),
        );
    } catch (error: any) {
        console.log('error (0)', error);
    }
};

export const http = {
    GET: (url: string, query?: any) => fetchWrap({ method: 'get', url, query }),
    POST: (url: string, body?: any) =>
        fetchWrap({ method: 'post', url: url, body: body }),
    PATCH: (url: string, body?: any) =>
        fetchWrap({ method: 'patch', url: url, body: body }),
    PUT: (url: string, body?: any, params?: any) =>
        fetchWrap({ method: 'put', url: url, body: body, params: params }),
    DELETE: (url: string) => fetchWrap({ method: 'delete', url: url }),
    REISSUE: (url: string) => reIssueApi.get(url),
};

// [기존 코드]
// export const http = {
//     GET: function get(url: string, query?: any) {
//         return query
//             ? api.addon(QueryStringAddon).query(query).get(url)
//             : api.get(url);
//     },
//     POST: function post(url: string, body?: any) {
//         return api.url(url).post(body);
//     },
//     PATCH: function patch(url: string, body?: any) {
//         return api.url(url).patch(body);
//     },
//     PUT: function put(url: string, body?: any, params?: any) {
//         return params.type === 'record'
//             ? api.addon(FormDataAddon).formData(body).url(url).put()
//             : api.url(url).put(body);
//     },
//     // delete is a reserved word in JS.
//     DELETE: function del(url: string) {
//         return api.delete(url);
//     },
//     REISSUE: function getReIssue(url: string) {
//         return reIssueApi.get(url);
//     },
// };
