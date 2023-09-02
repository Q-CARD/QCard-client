import { getInterviewAll } from '@/api/interview';
import { MDXRemote } from 'next-mdx-remote/rsc';

// 커스텀 설정
const components = {
    h1: (props: any) => (
        <h1 {...props} style={{ fontSize: '30px' }} className="large-text">
            {props.children}
        </h1>
    ),
};

export default async function MarkdownRenderer({
    content,
}: {
    content: string;
}) {
    const source = 'Some **mdx** text, with a component';

    const data = await getInterviewAll(5);
    //console.log('data', data);
    if (data) {
        //  console.log('mdx', data);
    }

    return <MDXRemote components={{ ...components }} source={content} />;
}
