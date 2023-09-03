// 모의 면접 모드 결과 페이지
import { Accordian } from '@/components/Accordian'; // gpt 답변 Props로 넘기기
import { Pagination } from '@/components/Pagination';
import MarkdownRenderer from '@/components/Markdown';
import NextButton from '@/components/interview/NextButton';
import FollowupButton from '@/components/interview/FollowupButton';
import Question from '@/components/interview/Question';

export default function InterviewResultPage() {
    return (
        <section className="flex flex-col items-center min-w-[82rem] m-auto">
            <div className="flex text-center flex-col w-[85rem] items-center rounded-2xl border border-grey-4 py-[4rem] px-[4.8rem] gap-[3.2rem] self-stretch">
                <Question />
                <Accordian
                    className="w-full"
                    // gptAnswer={curPageResult?.gpt_answer}
                >
                    <MarkdownRenderer
                        content={'# Hello word'}
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
