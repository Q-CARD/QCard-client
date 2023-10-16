// fetch.ts
import wretch from 'wretch';
import { CONSTANTS } from '@/constants/common';
import FormDataAddon from 'wretch/addons/formData';
import QueryStringAddon from 'wretch/addons/queryString';
import { getAccountsReissue } from '@/api/accounts';

let token = null;
if (typeof window !== 'undefined') {
    // execute only client side
    token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
}

const api = wretch(process.env.NEXT_PUBLIC_API_BASE_URL)
    .auth(`${token}`)
    .errorType('json')
    .resolve((r: any) => r.json() as any);

const reAuthOnTokenExpired = api;

// catcher(
//     500,
//     async (error, originalRequest) => {
//         console.log(error);
//         const token = await getAccountsReissue();

//         // return originalRequest
//         //     .auth(`Bearer ${token}`)
//         //     .fetch() // Replay the request with original method
//         //     // .unauthorized((err) => {
//         //     //     throw err;
//         //     // });

//         // then go ... (see below)
//     },
// );

export const http = {
    GET: function get(url: string, query?: any) {
        return query
            ? reAuthOnTokenExpired
                  .addon(QueryStringAddon)
                  .query(query)
                  .get(url)
                  .error(0, (err: any) => console.log(err))
            : reAuthOnTokenExpired
                  .get(url)
                  .error(0, (err: any) => console.log(err));
    },
    POST: function post(url: string, body?: any) {
        return reAuthOnTokenExpired.url(url).post(body);
    },
    PATCH: function patch(url: string, body?: any) {
        return reAuthOnTokenExpired.url(url).patch(body);
    },
    PUT: function put(url: string, body?: any, params?: any) {
        return params.type === 'record'
            ? reAuthOnTokenExpired
                  .addon(FormDataAddon)
                  .formData(body)
                  .url(url)
                  .put()
            : reAuthOnTokenExpired.url(url).put(body);
    },
    // delete is a reserved word in JS.
    DELETE: function del(url: string) {
        return reAuthOnTokenExpired.delete(url);
    },
};
