import wretch, { WretchResponse } from 'wretch';
import FormDataAddon from 'wretch/addons/formData';
import QueryStringAddon from 'wretch/addons/queryString';
import { getAccountsLogout, getAccountsReissue } from '@/api/accounts';

import { deleteCookie, setCookie } from 'cookies-next';
import { CONSTANTS } from '@/constants/common';

let token = null;
let refreshToken = null;

if (typeof window !== 'undefined') {
    token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
}

const api = wretch(process.env.NEXT_PUBLIC_API_BASE_URL, { cache: 'no-store' })
    .errorType('json')
    .addon(QueryStringAddon)
    .addon(FormDataAddon)
    .resolve((_: any) => _.unauthorized(authErrorHandler).json());

const reIssueApi = wretch(process.env.NEXT_PUBLIC_API_BASE_URL)
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
            const result = await originalRequest.auth(data.accessToken).fetch();
            return result;
        } catch (e) {
            logoutHandler();
        }
    }
};

interface fetchWrapType {
    method: 'get' | 'post' | 'patch' | 'put' | 'delete' | 'reissue';
    url: string;
    query?: any;
    body?: any;
    params?: { type: string };
    option?: { cache: string };
}

const fetchWrap = async ({
    method,
    url,
    query,
    body,
    params,
}: fetchWrapType) => {
    token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    let result;
    try {
        if (method === 'get') {
            result = query
                ? await api.auth(`${token}`).query(query).get(url)
                : await api.auth(`${token}`).get(url);
        } else if (method === 'post') {
            result = await api.auth(`${token}`).url(url).post(body);
        } else if (method === 'patch') {
            result = await api.auth(`${token}`).url(url).patch(body);
        } else if (method === 'put') {
            result =
                params?.type === 'record'
                    ? await api.auth(`${token}`).formData(body).url(url).put()
                    : await api.auth(`${token}`).url(url).put(body);
        } else if (method === 'delete') {
            result = await api.auth(`${token}`).delete(url);
        } else if (method === 'reissue') {
            result = await reIssueApi.auth(`${refreshToken}`).get(url);
        }
        console.log('result', result);
        return result;
    } catch (e) {}
};

export const http = {
    // method, url, query, body, param
    GET: (url: string, query?: any, option?: any) =>
        fetchWrap({ method: 'get', url, query, option: option }),
    POST: (url: string, body?: any) =>
        fetchWrap({ method: 'post', url, body: body }),
    PATCH: (url: string, body?: any) =>
        fetchWrap({ method: 'patch', url, body: body }),
    PUT: (url: string, body?: any, params?: any) =>
        fetchWrap({ method: 'put', url, body: body, params: params }),
    DELETE: (url: string) => fetchWrap({ method: 'delete', url }),
    REISSUE: (url: string) => fetchWrap({ method: 'reissue', url }),
};
