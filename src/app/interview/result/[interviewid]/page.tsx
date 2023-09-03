// 모의 면접 모드 결과 페이지
import { Accordian } from '@/components/Accordian'; // gpt 답변 Props로 넘기기
import { Pagination } from '@/components/Pagination';
import MarkdownRenderer from '@/components/Markdown';
import NextButton from '@/components/interview/NextButton';
import FollowupButton from '@/components/interview/FollowupButton';
import Question from '@/components/interview/Question';
import { headers } from 'next/headers';

//import
import { getInterviewAll } from '@/api/interview'; // interviewQuestionId => gptAnswer

export default async function InterviewResultPage() {
    const headerList = headers();
    //read the custom x-url header
    const header_url = headerList.get('x-url') || '';
    const header_url_domain = headerList.get('host') || '';
    const header_url_fullUrl = headerList.get('referer') || '';

    console.log('headerList.get', headerList);
    console.log('header_url', header_url);
    console.log('header_url_domain', header_url_domain);
    console.log('header_url_fullUrl', header_url_fullUrl);

    const id = header_url_fullUrl.split('=')?.[1]?.split('&')?.[0]; // 2
    console.log('id', id);

    let data = await getInterviewAll(parseInt(id));
    if (data) {
        console.log('드디어!!!!', data);
    }

    return (
        <section className="flex flex-col items-center min-w-[82rem] m-auto">
            <div className="flex text-center flex-col w-[85rem] items-center rounded-2xl border border-grey-4 py-[4rem] px-[4.8rem] gap-[3.2rem] self-stretch">
                <Question />
                <Accordian
                    className="w-full"
                    // gptAnswer={curPageResult?.gpt_answer}
                >
                    <MarkdownRenderer
                        content={data.gpt_answer} //{'# Hello world \n\n <pre>Hello world</pre>'}
                        // content={curPageResult?.gpt_answer ?? ''}
                    />
                </Accordian>
                <FollowupButton />
            </div>
            <Pagination className="mt-[3.4rem]" />
            <NextButton />
        </section>
    );
}
