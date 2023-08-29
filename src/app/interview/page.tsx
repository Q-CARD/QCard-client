// 면접모드 시작 /interview
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Checkbox from '@/components/Checkbox';
import ImgCardDeck2 from '@/assets/images/image-card-deck-2.png';
import { QUESTION_CATEGORY } from '@/constants/data';

export default function InterviewPage() {
    // TODO: 질문 유형 데이터 api 호출
    const [categoryList, setCategoryList] = React.useState<string[]>([]);

    const router = useRouter();

    const handleCategoryList = (category: string, isChecked: boolean) => {
        // 추가하려고 하는데 이미 최대 3개를 클릭한 경우 alert 띄우기
        if (categoryList.length === 3 && !isChecked) {
            alert('최대 3개까지만 선택이 가능합니다!');
            return;
        }
        if (categoryList.includes(category)) {
            // category가 있으면 제거하고, 없으면 추가하기
            setCategoryList([...categoryList.filter((el) => el !== category)]);
        } else {
            setCategoryList([...categoryList, category]);
        }
    };

    const handleInterviewStart = () => {
        // TODO: interviewId 획득
        const interviewid = 1;
        const pathname = `/interview/${interviewid}?question=1`;
        router.push(pathname);
    };

    //   <section className="flex justify-center pt-[17rem] min-w-[86rem] mr-[19.3rem] pb-[17.3rem] ml-[14.4rem]">
    return (
        <section className="flex justify-center pt-[17rem] min-w-[86rem] m-auto pb-[17.3rem] ">
            <div>
                <h1 className="text-center text-black text-5xl font-bold mb-[6.6rem]">
                    모의 면접을 시작해볼까요?
                </h1>
                <Image
                    src={ImgCardDeck2}
                    alt="card-deck2"
                    width={427}
                    height={409}
                />
            </div>
            <div className="flex flex-col h-[45.6rem] items-center ml-[19.3rem]">
                <h5 className="text-grey-6 text-lg font-normal text-center">
                    받고 싶은 질문 유형을 선택해주세요
                </h5>
                <div className="flex flex-col gap-[1.6rem] mt-[3.2rem] overflow-y-auto pr-[2rem]">
                    {QUESTION_CATEGORY.map(({ id, name }) => (
                        <Checkbox
                            key={id}
                            handleCategoryList={handleCategoryList}
                            isCheckableNum={categoryList.length}
                        >
                            {name}
                        </Checkbox>
                    ))}
                </div>
                <button onClick={handleInterviewStart}>
                    {/* TODO: 버튼 클릭 후, interviewId 획득해서 interviewId로 이동 */}
                    면접 시작하기
                </button>
            </div>
        </section>
    );
}
