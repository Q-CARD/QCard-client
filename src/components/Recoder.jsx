import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { FaPause } from 'react-icons/fa';
import { BsFillPlayFill } from 'react-icons/bs';
import ImgBgCircle from '@/assets/images/image-yellow-circle.png';

import { useSearchParams } from 'next/navigation';
import MicRecorder from 'mic-recorder-to-mp3';
import { interviewIdAtom } from '@/utils/atom';
import { submitRecordFile } from '@/api/interview';
import { useRecoilValue } from 'recoil';

export default function Recoder({
    handleRecordStart,
    handleRecordStop,
    isRecording,
    interviewQuestionId,
}) {
    // 녹음 라이브러리: mic-recorder-to-mp3 -> Types 지원 [x]

    const [state, setState] = useState({
        isRecording: false,
        blobURL: '',
        isBlocked: false,
    });

    const [isRecordFinish, setIsRecordFinish] = useState(false);

    // New instance
    const [Mp3Recorder, setMp3Recorder] = useState(
        new MicRecorder({ bitRate: 128 }),
    );

    const searchParams = useSearchParams();
    const interviewId = useRecoilValue(interviewIdAtom);
    const answer = searchParams?.get('question') ?? 1;

    useEffect(() => {
        navigator.getUserMedia(
            { audio: true },
            () => {
                console.log('Permission Granted');
                setState({ isBlocked: false });
            },
            () => {
                console.log('Permission Denied'); // TODO: permission denied한 경우 예외 처리
                setState({ isBlocked: true });
            },
        );
    }, []);

    const recordLimit = () => {
        if (isRecordFinish) {
            alert('녹음은 한번만 할 수 있습니다. 다음 문제로 넘어가주세요.');
            return;
        }
    };

    const start = async () => {
        //console.log('1. start 실행');
        if (state.isBlocked) {
            //console.log('Permission Denied');
        } else {
            Mp3Recorder.start()
                .then(() => {
                    //console.log('2. [Mp3Recorder start]');
                    setState({ isRecording: true });
                })
                .catch((e) => console.error(e));
        }
    };

    console.log('isRecordFinish', isRecordFinish);
    const stop = async () => {
        console.log('3. stop 실행');
        setIsRecordFinish(true); // 녹음 완료, 한번만 가능
        Mp3Recorder.stop()
            .getMp3()
            .then(async ([buffer, blob]) => {
                //console.log('4. [Mp3Recorder stop]');
                const blobURL = URL.createObjectURL(blob);
                setState({ blobURL, isRecording: false });

                const file = new File(buffer, '1_0.mp3', {
                    type: blob.type,
                    lastModified: Date.now(),
                });

                // 테스트용 다운로드
                /*
                const a = document.createElement('a');
                a.href = blobURL;
                a.download = '1_0.mp3'; // 다운로드될 파일 이름
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                */

                const formData = new FormData();
                formData.append('file', file);

                try {
                    let data = await submitRecordFile(
                        interviewQuestionId,
                        formData,
                    );
                    if (data) {
                        console.log(`[${data.id}]번 데이터`, data.message);
                    }
                } catch (e) {}
            })
            .catch((e) => console.log(e));
    };

    React.useEffect(() => {
        setIsRecordFinish(false);
    }, [answer]);

    React.useEffect(() => {
        if (isRecording === null) return;
        if (isRecording) {
            start();
        } else {
            stop();
        }
    }, [isRecording]);

    return (
        <div
            id="audio-container"
            className="relative w-[6.4rem] h-[6.4rem] cursor-pointer"
            onClick={
                // 이미 한번 녹음했으면 recordLimit을 호출해서 재녹음 방지
                isRecordFinish ? recordLimit : handleRecordStart
                // : isRecording
                // ? handleRecordStop
                // : handleRecordStart
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
            <audio
                style={{ marginTop: '100px' }}
                src={state.blobURL}
                controls="controls"
            />
        </div>
    );
}
