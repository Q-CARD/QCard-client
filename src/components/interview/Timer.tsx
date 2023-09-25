import React from 'react';
import { useSearchParams } from 'next/navigation';
import { intToString } from '@/utils/utils';
import { StatusType } from '@/types/index';

interface TimerProps {
    isRecording: StatusType;
    mm: number; // 종료 분
    ss: number; // 종료 초
    handleRecordStart: () => void;
    handleRecordStop: () => void;
    getTime: (second: number) => void;
}

export default function Timer({
    isRecording,
    handleRecordStop,
    getTime,
    mm,
    ss,
}: TimerProps) {
    // isRecording의 상태에 따라 타이머 토글
    const searchParams = useSearchParams();
    const question = searchParams?.get('question') ?? 1;

    // 다음 문제로 넘어갈 때마다 타이머 초기화
    React.useEffect(() => {
        count.current = 0;
        setMinute(intToString(0));
        setSecond(intToString(0));
    }, [question]);

    const MM = mm ? mm : 0;
    const SS = ss ? ss : 0;

    const count = React.useRef(0);

    const finish = MM * 60 + SS;
    const interval = React.useRef<NodeJS.Timeout>();

    const [minute, setMinute] = React.useState(intToString(0));
    const [second, setSecond] = React.useState(intToString(0));

    // 녹음 버튼이 클릭되면 타이머가 작동
    React.useEffect(() => {
        if (isRecording === 'record') {
            interval.current = setInterval(() => {
                count.current++;
                setMinute(intToString(Math.floor((count.current % 3600) / 60)));
                setSecond(intToString(Math.floor(count.current % 60)));
            }, 1000);
        }
    }, [isRecording]);

    // time limit 경과 후 녹음 종료
    const changeRecordingState = React.useCallback(() => {
        if (count.current >= finish) {
            alert(`${finish}초가 지났으므로 녹음이 완료되었습니다`);
            if (isRecording === 'record') {
                handleRecordStop();
            }
        }
    }, [isRecording]);

    // second가 변경될 때마다 finish에 도달했는지 체크
    React.useEffect(() => {
        getTime(count.current); // second가 변할 때마다 RecordCard와 상태 공유
        // 녹음 정지 상태라면 중단
        if (count.current >= finish || isRecording === 'finish') {
            clearInterval(interval.current);
        }
        changeRecordingState();
    }, [second]);

    return (
        <div className="">
            <div className="text-heading3 w-[7rem] text-black">
                {minute}:{second}
            </div>
        </div>
    );
}
