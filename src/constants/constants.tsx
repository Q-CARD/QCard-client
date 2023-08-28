const USER_LOCALSTORAGE_KEY = 'user';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

export { USER_LOCALSTORAGE_KEY, ACCESS_TOKEN, REFRESH_TOKEN };

export const QUESTION_CATEGORY = [
    {
        id: 1,
        name: '네트워크',
    },
    {
        id: 2,
        name: '운영체제',
    },
    {
        id: 3,
        name: '데이터베이스',
    },

    {
        id: 4,
        name: '자료구조',
    },
    {
        name: 'JAVA',
        id: 5,
    },
    {
        name: 'Python',
        id: 6,
    },
    {
        name: 'JavaScript',
        id: 7,
    },
    {
        name: 'DevOps/Infra',
        id: 8,
    },
    {
        name: 'Backend',
        id: 9,
    },
    {
        name: 'Frontend',
        id: 10,
    },
    {
        name: 'AI',
        id: 11,
    },
    {
        name: '인성 질문',
        id: 12,
    },
];

export const INTERVIEW_QUESTION = [
    { interview_question_id: 1, title: '프로세스의 구조에 대해 말씀해주세요' },
    {
        interview_question_id: 2,
        title: '프로세스와 스레드의 차이에 대해 말씀해주세요',
    },
    {
        interview_question_id: 3,
        title: '네트워크 OSI 7계층에 대해서 말씀해주세요',
    },
    { interview_question_id: 4, title: 'TCP와 UDP의 차이에 대해 말씀해주세요' },
    {
        interview_question_id: 5,
        title: 'TCP의 3way handshake에 대해 말씀해주세요',
    },
    { interview_question_id: 6, title: 'REST API에 대해 설명해주세요' },
    {
        interview_question_id: 7,
        title: '클라이언트/서버 모델에 대해 말씀해주세요',
    },
    { interview_question_id: 8, title: 'CSRF 토큰에 대해 말씀해주세요' },
    {
        interview_question_id: 9,
        title: 'Same Orogin Policy에 대해 말씀해주세요',
    },
    {
        interview_question_id: 10,
        title: '브라우저 렌더링 원리에 대해 말씀해주세요',
    },
];

export const INTERVIEW_RESULT = [
    {
        question_id: 1, // 고유 번호 1~10
        question: '네트워크 OSI 7계층에 대해서 설명해주세요',
        answer: '프로세스의 구조는 data, stack, code로 구성됐습니다.', //내 답변
        gpt_answer:
            '프로세스의 구조는 data, heap, stack, code 총 4가지로 구성됐습니다.',
        additional_question_1:
            '답변 감사합니다. OSI 7계층 중 전송계층에 대해서 자세하게 설명해주세요',
        additional_question_2:
            '답변 감사합니다. OSI 7계층 중 전송계층에 대해서 자세하게 설명해주세요',
        additional_question_3:
            '답변 감사합니다. OSI 7계층 중 전송계층에 대해서 자세하게 설명해주세요',
    },
    {
        question_id: 2, // 고유 번호 1~10
        question: '네트워크 OSI 7계층에 대해서 설명해주세요',
        answer: '프로세스의 구조는 data, stack, code로 구성됐습니다.', //내 답변
        gpt_answer:
            '프로세스의 구조는 data, heap, stack, code 총 4가지로 구성됐습니다.',
        additional_question_1:
            '답변 감사합니다. OSI 7계층 중 전송계층에 대해서 자세하게 설명해주세요',
        additional_question_2:
            '답변 감사합니다. OSI 7계층 중 전송계층에 대해서 자세하게 설명해주세요',
        additional_question_3:
            '답변 감사합니다. OSI 7계층 중 전송계층에 대해서 자세하게 설명해주세요',
    },
    {
        question_id: 3, // 고유 번호 1~10
        question: '네트워크 OSI 7계층에 대해서 설명해주세요',
        answer: '프로세스의 구조는 data, stack, code로 구성됐습니다.', //내 답변
        gpt_answer:
            '프로세스의 구조는 data, heap, stack, code 총 4가지로 구성됐습니다.',
        additional_question_1:
            '답변 감사합니다. OSI 7계층 중 전송계층에 대해서 자세하게 설명해주세요',
        additional_question_2:
            '답변 감사합니다. OSI 7계층 중 전송계층에 대해서 자세하게 설명해주세요',
        additional_question_3:
            '답변 감사합니다. OSI 7계층 중 전송계층에 대해서 자세하게 설명해주세요',
    },
    {
        question_id: 4, // 고유 번호 1~10
        question: '네트워크 OSI 7계층에 대해서 설명해주세요',
        answer: '프로세스의 구조는 data, stack, code로 구성됐습니다.', //내 답변
        gpt_answer:
            '프로세스의 구조는 data, heap, stack, code 총 4가지로 구성됐습니다.',
        additional_question_1:
            '답변 감사합니다. OSI 7계층 중 전송계층에 대해서 자세하게 설명해주세요',
        additional_question_2:
            '답변 감사합니다. OSI 7계층 중 전송계층에 대해서 자세하게 설명해주세요',
        additional_question_3:
            '답변 감사합니다. OSI 7계층 중 전송계층에 대해서 자세하게 설명해주세요',
    },
    {
        question_id: 5, // 고유 번호 1~10
        question: '네트워크 OSI 7계층에 대해서 설명해주세요',
        answer: '프로세스의 구조는 data, stack, code로 구성됐습니다.', //내 답변
        gpt_answer:
            '프로세스의 구조는 data, heap, stack, code 총 4가지로 구성됐습니다.',
        additional_question_1: 'additional_question1',
        additional_question_2: 'additional_question2',
        additional_question_3: 'additional_question3',
    },
    {
        question_id: 6, // 고유 번호 1~10
        question: '네트워크 OSI 7계층에 대해서 설명해주세요',
        answer: '프로세스의 구조는 data, stack, code로 구성됐습니다.', //내 답변
        gpt_answer:
            '프로세스의 구조는 data, heap, stack, code 총 4가지로 구성됐습니다.',
        additional_question_1: 'additional_question1',
        additional_question_2: 'additional_question2',
        additional_question_3: 'additional_question3',
    },
    {
        question_id: 7, // 고유 번호 1~10
        question: '네트워크 OSI 7계층에 대해서 설명해주세요',
        answer: '프로세스의 구조는 data, stack, code로 구성됐습니다.', //내 답변
        gpt_answer:
            '프로세스의 구조는 data, heap, stack, code 총 4가지로 구성됐습니다.',
        additional_question_1: 'additional_question1',
        additional_question_2: 'additional_question2',
        additional_question_3: 'additional_question3',
    },
    {
        question_id: 8, // 고유 번호 1~10
        question: '네트워크 OSI 7계층에 대해서 설명해주세요',
        answer: '프로세스의 구조는 data, stack, code로 구성됐습니다.', //내 답변
        gpt_answer:
            '프로세스의 구조는 data, heap, stack, code 총 4가지로 구성됐습니다.',
        additional_question_1: 'additional_question1',
        additional_question_2: 'additional_question2',
        additional_question_3: 'additional_question3',
    },
    {
        question_id: 9, // 고유 번호 1~10
        question: '네트워크 OSI 7계층에 대해서 설명해주세요',
        answer: '프로세스의 구조는 data, stack, code로 구성됐습니다.', //내 답변
        gpt_answer:
            '프로세스의 구조는 data, heap, stack, code 총 4가지로 구성됐습니다.',
        additional_question_1: 'additional_question1',
        additional_question_2: 'additional_question2',
        additional_question_3: 'additional_question3',
    },
    {
        question_id: 10, // 고유 번호 1~10
        question: '네트워크 OSI 7계층에 대해서 설명해주세요',
        answer: '프로세스의 구조는 data, stack, code로 구성됐습니다.', //내 답변
        gpt_answer:
            '프로세스의 구조는 data, heap, stack, code 총 4가지로 구성됐습니다.',
        additional_question_1: 'additional_question1',
        additional_question_2: 'additional_question2',
        additional_question_3: 'additional_question3',
    },
];
