import { http } from '@/utils/fetch';

// 좋아요 누르기 (답변이 isHearted == false인 경우 호출) - 클라이언트
export const postHearts = async (answerId: number) => {
    return await http.POST(`/hearts/${answerId}`);
};

// 좋아요 취소하기 (답변이 isHearted == true인 경우 호출) - 클라이언트
export const deleteHearts = async (answerId: number) => {
    return await http.DELETE(`/hearts/${answerId}`);
};
