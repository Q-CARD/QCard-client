// fetch.ts
import wretch from 'wretch';
import { CONSTANTS } from '@/constants/common';
import FormDataAddon from 'wretch/addons/formData';
import QueryStringAddon from 'wretch/addons/queryString';

let token = null;
if (typeof window !== 'undefined') {
    // execute only client side
    token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
}

const api = wretch(process.env.NEXT_PUBLIC_API_BASE_URL)
    .auth(`${token}`)
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
};
