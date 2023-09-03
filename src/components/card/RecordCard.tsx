'use client';

import React from 'react';
import Timer from '../Timer';
import Recoder from '../Recoder';

interface QuestionType {
    category: string; // "CATEGORY_NW"
    id: number; // question_id
    title: string;
}

export default function RecordCard({
    question,
    cnt,
    interviewQuestionId,
    getRecordingStatus,
}: {
    interviewQuestionId: number;
    question: QuestionType | undefined;
    cnt: number;
    getRecordingStatus: (isRecording: boolean | null) => void;
}) {
    // 타이머 클릭 & 녹음 stop/start 상태 관리
    const [isRecording, setIsRecording] = React.useState<null | boolean>(null);

    React.useEffect(() => {
        getRecordingStatus(isRecording);
    }, [isRecording]);
    // 시작
    const handleRecordStart = () => {
        console.log('handleRecordStart');
        setIsRecording(true);
    };

    // 중단
    const handleRecordStop = () => {
        if (isRecording) {
        }
        console.log('handleRecordStop');
        setIsRecording(false);
    };

    // 다음 문제로 넘어갈 때마다 타이머 초기화
    React.useEffect(() => {
        setIsRecording(null);
    }, [question]);

    return (
        <div className="flex flex-col items-center rounded-2xl border border-grey-4 py-[3.2rem] px-[2.4rem] gap-[5.4rem] self-stretch">
            <div className="text-heading3 text-blue-primary">{cnt}</div>
            <div className="text-center">
                <h1 className="text-specialHeading">{question?.title}</h1>
                <div className="text-bodyDefault text-grey-5">
                    녹음한 대답을 기반으로 꼬리질문을 드립니다
                </div>
            </div>
            <div className="flex flex-col items-center text-center">
                <Recoder
                    isRecording={isRecording}
                    handleRecordStart={handleRecordStart}
                    handleRecordStop={handleRecordStop}
                    interviewQuestionId={interviewQuestionId}
                />
                <Timer
                    handleRecordStart={handleRecordStart}
                    handleRecordStop={handleRecordStop}
                    isRecording={isRecording}
                    mm={1}
                    ss={0}
                />
            </div>
        </div>
    );
}
