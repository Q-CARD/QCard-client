import React from 'react';
import Timer from '../Timer';
import Recoder from '../Recoder';
import { IQuestionInterview } from '@/types';

export default function RecordCard({
    question,
    cnt,
    interviewQuestionId,
    getRecordingStatus,
}: {
    interviewQuestionId: number;
    question: IQuestionInterview | undefined;
    cnt: number;
    getRecordingStatus: (isRecording: boolean | null) => void;
}) {
    const [isRecording, setIsRecording] = React.useState<null | boolean>(null);
    const timeRef = React.useRef<number>(0);

    const MIN_TIME_LIMIT = 60;

    React.useEffect(() => {
        getRecordingStatus(isRecording);
    }, [isRecording]);

    const handleRecordStart = () => {
        setIsRecording(true);
    };

    const getTime = (time: number) => {
        if (timeRef) {
            timeRef.current = time;
        }
    };

    /**
     * @description 녹음 중지 버튼 클릭 시 호출 & isRecording 상태 관리
     * - 순서: onClick -> handleRecordStop 호출 -> isRecording 상태 변화 -> Timer start/stop
     */
    const handleRecordStop = () => {
        if (timeRef && timeRef.current < MIN_TIME_LIMIT) {
            alert('최소 1분은 녹음해주세요');
            return;
        }
        setIsRecording(false);
    };

    // 다음 문제로 넘어갈 때마다 타이머 초기화
    React.useEffect(() => {
        setIsRecording(null);
    }, [question]);

    return (
        <div className="flex flex-col items-center rounded-2xl border border-grey-4 py-[3.2rem] px-[2.4rem] gap-[5.4rem] self-stretch">
            <div className="text-heading3 text-blue-primary">{cnt}</div>
            <div className="text-center flex items-center flex-col m-auto">
                <h1 className="flex text-specialHeading w-3/5 break-keep text-center">
                    {question?.title}
                </h1>
                <div className="text-bodyDefault text-grey-5 mt-[2rem]">
                    녹음한 대답을 기반으로 꼬리질문을 드립니다
                    <br />
                    답변 시간은 1분입니다
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
                    getTime={getTime}
                    mm={10}
                    ss={0}
                />
            </div>
        </div>
    );
}
