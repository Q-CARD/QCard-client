import React, { useCallback } from 'react';
import Timer from './Timer';
import Recoder from './Recoder';
import { IQuestionInterview } from '@/types';
import { useSearchParams } from 'next/navigation';

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
    const START_TEXT = '녹음을 시작해주세요.';
    const RECORDING_TEXT = '답변을 녹음중입니다.';
    const FINISH_TEXT = '답변 녹음을 완료했습니다.';

    // TODO: isRecording이랑 text 합칠지 말지 결정하기
    const [isRecording, setIsRecording] = React.useState<null | boolean>(null);
    const [recordingText, setRecordingText] =
        React.useState<string>(START_TEXT);
    const timeRef = React.useRef<number>(0);
    const searchParams = useSearchParams();
    const questionId = searchParams.get('question') ?? '1';

    const MIN_TIME_LIMIT = 2; // TODO: 60으로 수정

    React.useEffect(() => {
        getRecordingStatus(isRecording);
        getRecordText();
    }, [isRecording]);

    const getRecordText = useCallback(() => {
        switch (isRecording) {
            case null:
                return START_TEXT;
            case true:
                return RECORDING_TEXT;
            case false:
                return FINISH_TEXT;
            default:
                return START_TEXT;
        }
    }, [isRecording]);

    const handleRecordStart = () => {
        setIsRecording(true);
        setRecordingText(RECORDING_TEXT);
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
        setRecordingText(FINISH_TEXT);
    };

    // 다음 문제로 넘어갈 때마다 타이머 초기화
    React.useEffect(() => {
        setIsRecording(null);
        setRecordingText(START_TEXT);
    }, [questionId]);

    return (
        <div className="relative flex flex-col items-center rounded-2xl bg-white border border-grey-4 py-[9.6rem] px-[7.1rem] gap-[7rem] self-stretch">
            <div className="flex items-center justify-center absolute top-[-2.8rem] bg-blue-primary w-[5.7rem] h-[5.7rem] rounded-[50%]">
                <span className=" text-white text-heading3">{cnt}</span>
            </div>
            <div className="text-center flex items-center flex-col m-auto max-w-[78rem]">
                <h1 className="flex text-specialHeading break-keep text-center">
                    {question?.title ??
                        '네트워크 OSI 7계층에 대해서 설명해주세요. 네트워크 OSI 7계층에 대해서 설명해주세요.'}
                </h1>
            </div>
            <hr className="bg-grey-2 w-full h-[2px]" />
            <div className="flex flex-col gap-[2.8rem] text-center">
                <div className="flex gap-[2rem] py-[8px] pl-[1rem] pr-[2.9rem] items-center border border-blue-3 border-[3px] rounded-[4.5rem] shadow-2">
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
                <p
                    className={`${
                        isRecording === false
                            ? 'text-blue-primary'
                            : 'text-grey-5'
                    } text-heading5`}
                >
                    {recordingText}
                </p>
            </div>
        </div>
    );
}
