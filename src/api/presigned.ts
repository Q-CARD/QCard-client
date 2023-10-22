import wretch from 'wretch';

const api = wretch(process.env.NEXT_PUBLIC_PRESIGNED_URL)
    .errorType('json')
    .resolve((r: any) => r.res() as any);

export const postPresignedURL = async (payload: any) => {
    return await api.post(payload);
};
