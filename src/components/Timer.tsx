// 클라이언트 컴포넌트
import React from 'react';
import { useSearchParams } from 'next/navigation';

interface TimerProps {
    isRecording: boolean | null;
    mm: number; // 종료 분
    ss: number; // 종료 초
    handleRecordStart: () => void;
    handleRecordStop: () => void;
}

export default function Timer({
    isRecording,
    handleRecordStart,
    handleRecordStop,
    mm,
    ss,
}: TimerProps) {
    // isRecording의 상태에 따라 타이머 토글
    const searchParams = useSearchParams();

    const question = searchParams?.get('question') ?? 1;

    // padStart 함수를 이용해서 10보다 작은 경우 0을 붙인다
    const intToString = (num: number) => String(num).padStart(2, '0');

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
    const interval = React.useRef<any>(0);

    // 각 시간에 대한 변수는 useState로 선언한다
    const [minute, setMinute] = React.useState(intToString(0)); // 시간으로 하려면 intToString(MM)
    const [second, setSecond] = React.useState(intToString(0)); // 시간으로 하려면 intToString(SS)

    // 녹음 버튼이 클릭되면 타이머가 작동하도록 한다
    React.useEffect(() => {
        if (isRecording) {
            interval.current = setInterval(() => {
                count.current++;
                setMinute(intToString(Math.floor((count.current % 3600) / 60)));
                setSecond(intToString(Math.floor(count.current % 60)));
            }, 1000);
        }
    }, [isRecording]);

    // 1분이 지나면 isRecording 상태를 true로 바꿈
    const changeRecordingState = React.useCallback(() => {
        if (count.current >= finish) {
            alert(`${finish}초가 지났으므로 녹음이 완료되었습니다`);
            if (isRecording) {
                handleRecordStop();
            }
        }
    }, [isRecording]);

    // second가 변경될 때마다 finish에 도달했는지 체크한다
    React.useEffect(() => {
        // 녹음 정지 상태라면 중단한다
        if (count.current >= finish || !isRecording) {
            clearInterval(interval.current);
        }
        changeRecordingState();
    }, [second, isRecording]);

    return (
        <div className="mt-[1rem]">
            <div className="text-heading5 text-yellow-sub">
                {minute}:{second}
            </div>
        </div>
    );
}
