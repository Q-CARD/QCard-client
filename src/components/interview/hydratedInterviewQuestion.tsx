import getQueryClient from '@/utils/getQueryClient';
import { dehydrate, Hydrate } from '@tanstack/react-query';
import { InterviewQuestionSection } from '.';
import { headers } from 'next/headers';
import { getInterviewAll } from '@/api/interview';

export default async function HydratedInterviewQuestion() {
    const queryClient = getQueryClient();

    const headerList = headers();

    //read the custom x-url header
    const header_url_fullUrl = headerList.get('referer') || '';

    let interview_question_id =
        parseInt(
            header_url_fullUrl?.split('?')[1]?.split('&')[0]?.split('=')[1],
        ) || 1;

    await queryClient.prefetchQuery(
        ['interviewQuestions', interview_question_id],
        () => getInterviewAll(interview_question_id),
        {
            staleTime: 0,
            cacheTime: 1000 * 20, // 20초
        },
    );
    const dehydratedState = dehydrate(queryClient);

    return (
        <Hydrate state={dehydratedState}>
            <InterviewQuestionSection />
        </Hydrate>
    );
}
