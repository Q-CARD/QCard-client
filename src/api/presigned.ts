import wretch from 'wretch';
import { CONSTANTS } from '@/constants/common';

let token = null;
if (typeof window !== 'undefined') {
    token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
}

const api = wretch(process.env.NEXT_PUBLIC_PRESIGNED_URL)
    .auth(`${token}`)
    .errorType('json')
    .resolve((r: any) => r.json() as any);

export const postPresignedURL = async (payload: any) => {
    return await api.url('/default/presigned').post(payload);
};
