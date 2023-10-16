// fetch.ts
import wretch from 'wretch';
import { CONSTANTS } from '@/constants/common';
import FormDataAddon from 'wretch/addons/formData';
import QueryStringAddon from 'wretch/addons/queryString';
import { getAccountsLogout, getAccountsReissue } from '@/api/accounts';

let token = null;
let refreshToken = null;
if (typeof window !== 'undefined') {
    // execute only client side
    token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    refreshToken = localStorage.getItem('f');
}

const api = wretch(process.env.NEXT_PUBLIC_API_BASE_URL)
    .auth(`${token}`)
    .errorType('json')
    .resolve((r: any) => r.json() as any)
    .catcher(500, async (err: any, originalRequest) => {
        // TODO - response body 확인, refresh token 위치 변경.
        // 현재 500 에러는 모두 reissue. 정상 작동은 response.details === "JWT EXPIRED" 일때만 reissue 필요.
        try {
            const data = await getAccountsReissue();

            if (data) {
                localStorage.setItem(CONSTANTS.ACCESS_TOKEN, data.accessToken);
                localStorage.setItem('f', data.refreshToken);

                return originalRequest.auth(data.accessToken).fetch().json();
            }
        } catch (e) {
            const data = await getAccountsLogout();
            if (data) {
                alert('유효하지 않은 토큰입니다.');
                localStorage.clear();
            }
        }
    });

const reIssueApi = wretch(process.env.NEXT_PUBLIC_API_BASE_URL)
    .auth(`${refreshToken}`)
    .errorType('json')
    .resolve((r: any) => r.json() as any);

export const http = {
    GET: function get(url: string, query?: any) {
        return query
            ? api.addon(QueryStringAddon).query(query).get(url)
            : api.get(url);
    },
    POST: function post(url: string, body?: any) {
        return api.url(url).post(body);
    },
    PATCH: function patch(url: string, body?: any) {
        return api.url(url).patch(body);
    },
    PUT: function put(url: string, body?: any, params?: any) {
        return params.type === 'record'
            ? api.addon(FormDataAddon).formData(body).url(url).put()
            : api.url(url).put(body);
    },
    // delete is a reserved word in JS.
    DELETE: function del(url: string) {
        return api.delete(url);
    },
    REISSUE: function getReIssue(url: string) {
        return reIssueApi.get(url);
    },
};
