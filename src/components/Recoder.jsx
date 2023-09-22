import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import MicRecorder from 'mic-recorder-to-mp3';
import { submitRecordFile } from '@/api/interview';

import { FaPause } from 'react-icons/fa';
import { BsFillPlayFill } from 'react-icons/bs';
import ImgBgCircle from '@/assets/images/image-yellow-circle.png';
import { FILE_NAME } from '@/constants/constants';

export default function Recoder({
    handleRecordStart,
    handleRecordStop,
    isRecording,
    interviewQuestionId,
}) {
    // 녹음 라이브러리: mic-recorder-to-mp3 -> Types 지원 [x]

    const searchParams = useSearchParams();
    const answer = searchParams?.get('question') ?? 1;

    const [isRecordFinish, setIsRecordFinish] = useState(false);
    const [Mp3Recorder, _] = useState(new MicRecorder({ bitRate: 128 }));
    const [state, setState] = useState({
        isRecording: false,
        blobURL: '',
        isBlocked: false,
    });

    useEffect(() => {
        navigator.getUserMedia(
            { audio: true },
            () => {
                setState({ isBlocked: false });
            },
            () => {
                setState({ isBlocked: true });
            },
        );
    }, []);

    const recordLimit = () =>
        alert('녹음은 한번만 할 수 있습니다. 다음 문제로 넘어가주세요.');

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
            let data = await submitRecordFile(interviewQuestionId, formData);
            //if (data) {
            //    console.log(`[${data.id}]번 데이터 전송 완료`, data.message);
            //}
        } catch {}
    };

    const start = async () => {
        if (state.isBlocked) {
            // TODO: 예외 처리
            return;
        }
        Mp3Recorder.start()
            .then(() => {
                setState({ isRecording: true });
            })
            .catch((e) => console.error(e));
    };

    const stop = async () => {
        setIsRecordFinish(true); // 녹음 완료, 한번만 가능
        Mp3Recorder.stop()
            .getMp3()
            .then(async ([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob);
                setState({ blobURL, isRecording: false });
                const formData = makeFile(buffer, blob);
                sendFile(formData);
            })
            .catch((e) => console.log(e));
    };

    React.useEffect(() => {
        setIsRecordFinish(false);
    }, [answer]);

    React.useEffect(() => {
        if (isRecording === null) return;
        if (isRecording) start();
        else stop();
    }, [isRecording]);

    return (
        <div
            id="audio-container"
            className="relative w-[6.4rem] h-[6.4rem] cursor-pointer"
            onClick={
                // 이미 한번 녹음했으면 재녹음 방지
                isRecordFinish
                    ? recordLimit
                    : // 녹음 시도 X && 현재 녹음 중 -> stop
                    isRecording
                    ? handleRecordStop
                    : handleRecordStart
            }
        >
            <Image
                src={ImgBgCircle}
                alt="image-yellow-circle"
                className="absolute"
                width={64}
                height={64}
            />
            {isRecording ? (
                <FaPause
                    size="16"
                    color="var(--white)"
                    className="absolute top-[2.4rem] left-[2.4rem]"
                />
            ) : (
                <BsFillPlayFill
                    size="30"
                    color="var(--white)"
                    className="absolute top-[1.8rem] left-[1.8rem]"
                />
            )}
        </div>
    );
}
