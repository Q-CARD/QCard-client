// fetch.ts
import wretch, { Wretch, WretchResponse } from 'wretch';
import { CONSTANTS } from '@/constants/common';
import FormDataAddon from 'wretch/addons/formData';
import QueryStringAddon from 'wretch/addons/queryString';
import { getAccountsLogout, getAccountsReissue } from '@/api/accounts';
import { deleteCookie, setCookie } from 'cookies-next';

let token = null;
let refreshToken = null;

// TODO: 토큰이 저장되어 있는데 브라우저에 null이 찍히는 이유
if (typeof window !== 'undefined') {
    token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
    console.log('[client] accessToken', token);
    console.log('[client] refreshToken', refreshToken);
}

const api = wretch(process.env.NEXT_PUBLIC_API_BASE_URL)
    .auth(`${token}`)
    .errorType('json')
    .addon(QueryStringAddon)
    .addon(FormDataAddon)
    .resolve((_: any) => _.unauthorized(authErrorHandler).json());

const reIssueApi = wretch(process.env.NEXT_PUBLIC_API_BASE_URL)
    .auth(`${refreshToken}`)
    .errorType('json')
    .resolve((_: any) => _.unauthorized(authErrorHandler).json());

type WretchError = Error & {
    status: number;
    response: WretchResponse;
    text?: string;
    json?: Object;
};

const logoutHandler = async () => {
    try {
        const data = await getAccountsLogout();
        if (data) {
            localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
            localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
            deleteCookie(CONSTANTS.ACCESS_TOKEN);
            window.location.href = '/';
        }
    } catch (e) {
        console.error(e);
    }
};

const authErrorHandler = async (error: WretchError, originalRequest: any) => {
    let data;
    try {
        data = await getAccountsReissue();
    } catch (e) {
        logoutHandler();
    }

    if (data) {
        localStorage.setItem(CONSTANTS.ACCESS_TOKEN, data.accessToken);
        localStorage.setItem(CONSTANTS.REFRESH_TOKEN, data.refreshToken);
        setCookie(CONSTANTS.ACCESS_TOKEN, data.accessToken); // 로그인 판별 미들웨어용

        try {
            const result = await originalRequest
                .auth(data.accessToken)
                .fetch()
                .unauthorized((err: any) => {
                    throw new Error('에러');
                });
            return result;
        } catch (e) {
            logoutHandler();
        }
    }
};

export const http = {
    GET: async function get(url: string, query?: any) {
        return query
            ? await api.addon(QueryStringAddon).query(query).get(url)
            : await api.get(url);
    },
    POST: async function post(url: string, body?: any) {
        return await api.url(url).post(body);
    },
    PATCH: async function patch(url: string, body?: any) {
        return await api.url(url).patch(body);
    },
    PUT: async function put(url: string, body?: any, params?: any) {
        return params.type === 'record'
            ? await api.addon(FormDataAddon).formData(body).url(url).put()
            : await api.url(url).put(body);
    },
    // delete is a reserved word in JS.
    DELETE: function del(url: string) {
        return api.delete(url);
    },
    REISSUE: async function getReIssue(url: string) {
        return await reIssueApi.get(url);
    },
};
