import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import MicRecorder from 'mic-recorder-to-mp3';
import { submitRecordFile } from '@/api/interview';

// assets
import IconCircleBlue from '@/assets/icons/icon-circle-blue.png';
import IconCircleGrey from '@/assets/icons/icon-circle-grey.png';
import IconPause from '@/assets/icons/icon-record-pause.png';
import IconMicGrey from '@/assets/icons/icon-mic-grey.png';
import IconMicBlue from '@/assets/icons/icon-mic-blue.png';
import { FILE_NAME } from '@/constants/constants';

export default function Recoder({
    handleRecordStart,
    handleRecordStop,
    isRecording,
    interviewQuestionId,
    getPermission,
}) {
    const WARNING = '녹음은 한번만 할 수 있습니다. 다음 문제로 넘어가주세요.';

    const searchParams = useSearchParams();
    const answer = searchParams?.get('question') ?? 1;

    const [isRecordFinish, setIsRecordFinish] = useState(false);
    const [Mp3Recorder, _] = useState(new MicRecorder({ bitRate: 128 }));
    const [state, setState] = useState({
        isRecording: false,
        isBlocked: false,
        blobURL: '',
    });

    const permissionCallback = (state) => {
        setState({ isBlocked: !state });
        getPermission(state);
    };

    useEffect(() => {
        navigator.getUserMedia(
            { audio: true },
            () => permissionCallback(true),
            () => permissionCallback(false),
        );
    }, []);

    const recordLimit = () => alert(WARNING);

    const makeFile = (buffer, blob) => {
        const file = new File(buffer, FILE_NAME, {
            type: blob.type,
            lastModified: Date.now(),
        });
        const formData = new FormData();
        formData.append('file', file);
        return formData;
    };

    const sendFile = async (formData) => {
        try {
            await submitRecordFile(interviewQuestionId, formData);
        } catch {}
    };

    const start = async () => {
        Mp3Recorder.start()
            .then(() => {
                setState({ isRecording: true });
            })
            .catch((e) => console.error(e));
    };

    const stop = async () => {
        setIsRecordFinish(true); // 녹음 완료, 한번만 가능
        let [buffer, blob] = await Mp3Recorder.stop().getMp3();

        if (buffer) {
            const blobURL = URL.createObjectURL(blob);
            setState({ blobURL, isRecording: false });
            await sendFile(makeFile(buffer, blob));
        }
    };

    React.useEffect(() => {
        setIsRecordFinish(false);
    }, [answer]);

    React.useEffect(() => {
        if (isRecording === 'not-start') return;
        isRecording === 'record' ? start() : stop();
    }, [isRecording]);

    const IconArr = [
        {
            src: IconMicGrey,
            width: 48,
            height: 48,
            status: 'finish',
            className: 'top-[calc(50%-24px)] left-[calc(50%-24px)]',
        },
        {
            src: IconMicBlue,
            width: 48,
            height: 48,
            status: 'not-start',
            className: 'top-[calc(50%-24px)] left-[calc(50%-24px)]',
        },
        {
            src: IconPause,
            width: 30,
            height: 30,
            status: 'record',
            className: 'top-[calc(50%-15px)] left-[calc(50%-15px)]',
        },
    ];

    const getImageByStatus = (status) => {
        if (isRecordFinish) return IconArr[0];
        return IconArr.find((icon) => icon.status === status);
    };

    return (
        <div
            id="audio-container"
            className="relative w-[6.4rem] h-[6.4rem] cursor-pointer"
            onClick={
                // 이미 한번 녹음했으면 재녹음 방지
                isRecordFinish
                    ? recordLimit
                    : // 녹음 시도 X && 현재 녹음 중 -> stop
                    isRecording === 'record'
                    ? handleRecordStop
                    : handleRecordStart
            }
        >
            <Image
                src={isRecordFinish ? IconCircleGrey : IconCircleBlue}
                alt="image-bg-circle"
                className="absolute"
                width={64}
                height={64}
            />
            <Image
                src={getImageByStatus(isRecording)?.src}
                alt="icon-record"
                className={`absolute ${
                    getImageByStatus(isRecording)?.className
                }`}
                width={getImageByStatus(isRecording)?.width}
                height={getImageByStatus(isRecording)?.height}
            />
        </div>
    );
}
