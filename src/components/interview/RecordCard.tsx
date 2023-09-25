import React, { useCallback, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Timer from './Timer';
import Recoder from './Recoder';
import { IQuestionInterview, IActionRecord, StatusType } from '@/types';
import { DEFAULT_QUESTION } from '@/constants/common';

const START_TEXT = '녹음을 시작해주세요.';
const RECORD_TEXT = '답변을 녹음중입니다.';
const FINISH_TEXT = '답변 녹음을 완료했습니다.';
const PERMISSION_WARNING_TEXT = '녹음 권한을 허용해주세요';
const TIME_MIN_LIMIT_TEXT = '최소 1분은 녹음해주세요';

interface RecordStatus {
    status: StatusType;
    text: RecordStatusText;
}

type RecordStatusText =
    | typeof START_TEXT
    | typeof RECORD_TEXT
    | typeof FINISH_TEXT;

function recordReducer(
    state: RecordStatus,
    action: IActionRecord,
): RecordStatus {
    switch (action.type) {
        case 'start':
            return { status: action.recording, text: RECORD_TEXT };
        case 'stop':
            return { status: action.recording, text: FINISH_TEXT };
        case 'reset':
            return { status: action.recording, text: START_TEXT };
        default:
            return state;
    }
}

const RECORD_INITIAL_STATUS: RecordStatus = {
    status: 'not-start',
    text: START_TEXT,
};

interface RecordCardTypes {
    interviewQuestionId: number;
    question: IQuestionInterview | undefined;
    cnt: number;
    getRecordingStatus: (recording: StatusType) => void;
}

export default function RecordCard({
    question,
    cnt,
    interviewQuestionId,
    getRecordingStatus,
}: RecordCardTypes) {
    const [recording, dispatch] = React.useReducer(
        recordReducer,
        RECORD_INITIAL_STATUS,
    );

    const timeRef = React.useRef<number>(0);
    const searchParams = useSearchParams();
    const questionId = searchParams.get('question') ?? '1';
    const [permission, setPermission] = useState<boolean>(false);

    const MIN_TIME_LIMIT = 2; // TODO: 실 배포시 60으로 수정

    React.useEffect(() => {
        getRecordingStatus(recording.status);
    }, [recording.status]);

    const checkPermission = (): boolean => {
        if (!permission) {
            alert(PERMISSION_WARNING_TEXT);
            return false;
        }
        return true;
    };

    const handleRecordStart = () => {
        if (!checkPermission()) return;
        dispatch({ type: 'start', recording: 'record' });
    };

    const getPermission = (state: boolean) => setPermission(state);

    const getTime = useCallback((time: number) => {
        if (timeRef) {
            timeRef.current = time;
        }
    }, []);

    /**
     * @description 녹음 중지 버튼 클릭 시 호출 & isRecording 상태 관리
     * - 순서: onClick -> handleRecordStop 호출 -> isRecording 상태 변화 -> Timer start/stop
     */
    const handleRecordStop = () => {
        if (timeRef && timeRef.current < MIN_TIME_LIMIT) {
            alert(TIME_MIN_LIMIT_TEXT);
            return;
        }
        dispatch({ type: 'stop', recording: 'finish' });
    };

    // 다음 문제로 넘어갈 때마다 타이머 초기화
    React.useEffect(() => {
        dispatch({ type: 'reset', recording: 'not-start' });
    }, [questionId]);

    return (
        <div className="relative flex flex-col items-center rounded-2xl bg-white border border-grey-4 py-[9.6rem] px-[7.1rem] gap-[7rem] self-stretch">
            <div className="flex items-center justify-center absolute top-[-2.8rem] bg-blue-primary w-[5.7rem] h-[5.7rem] rounded-[50%]">
                <span className=" text-white text-heading3">{cnt}</span>
            </div>
            <div className="text-center flex items-center flex-col m-auto max-w-[78rem]">
                <h1 className="flex text-specialHeading break-keep text-center">
                    {question?.title ?? DEFAULT_QUESTION}
                </h1>
            </div>
            <hr className="bg-grey-2 w-full h-[2px]" />
            <div className="flex flex-col gap-[2.8rem] text-center">
                <div
                    className={`flex gap-[2rem] py-[8px] pl-[1rem] pr-[2.9rem] items-center border ${
                        recording.text === FINISH_TEXT
                            ? 'border-grey-4'
                            : 'border-blue-3'
                    } border-[3px] rounded-[4.5rem] shadow-2`}
                >
                    <Recoder
                        isRecording={recording.status}
                        handleRecordStart={handleRecordStart}
                        handleRecordStop={handleRecordStop}
                        interviewQuestionId={interviewQuestionId}
                        getPermission={getPermission}
                    />
                    <Timer
                        handleRecordStart={handleRecordStart}
                        handleRecordStop={handleRecordStop}
                        isRecording={recording.status}
                        getTime={getTime}
                        mm={10}
                        ss={0}
                    />
                </div>
                <p
                    className={`${
                        recording.status === 'finish'
                            ? 'text-blue-primary'
                            : 'text-grey-5'
                    } text-heading5`}
                >
                    {recording.text}
                </p>
            </div>
        </div>
    );
}
