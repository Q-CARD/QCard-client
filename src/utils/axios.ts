import axios, { AxiosRequestConfig } from 'axios';
import { CONSTANTS } from '@/constants/constants';

const fetchWrapper = async ({ method, url, body, params }: any) => {
    let token = null;
    if (typeof window !== 'undefined') {
        // execute only client side
        token = localStorage.getItem(CONSTANTS.USER.ACCESS_TOKEN); // 로컬스토리지에 토큰 저장
    }

    const config: AxiosRequestConfig = {
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        timeout: 100000, // 20000ms
        headers: {
            'Content-Type':
                params?.type === 'record'
                    ? 'multipart/form-data'
                    : 'application/json',
            Authorization: token,
        },
        ...params,
    };

    try {
        const { data } =
            (method === 'get' && (await axios.get(url, config))) ||
            (method === 'post' && (await axios.post(url, body, config))) ||
            (method === 'put' && (await axios.put(url, body, config))) ||
            (method === 'patch' && (await axios.patch(url, body, config))) ||
            (method === 'delete' && (await axios.delete(url, config))) ||
            {};

        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const GET = (url: string, params?: any) =>
    fetchWrapper({ method: 'get', url, params });

export const POST = (url: string, body: any, params?: any) =>
    fetchWrapper({ method: 'post', url, body, params });

export const PUT = (url: string, body: any, params?: any) =>
    fetchWrapper({ method: 'put', url, body, params });

export const PATCH = (url: string, body: any, params?: any) =>
    fetchWrapper({ method: 'patch', url, body, params });

export const DELETE = (url: string) => fetchWrapper({ method: 'delete', url });
