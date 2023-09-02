import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { FaPause } from 'react-icons/fa';
import { BsFillPlayFill } from 'react-icons/bs';
import ImgBgCircle from '@/assets/images/image-yellow-circle.png';
import MicRecorder from 'mic-recorder-to-mp3';

export default function Recoder({
    handleRecordStart,
    handleRecordStop,
    isRecording,
}) {
    // 녹음 라이브러리: mic-recorder-to-mp3 -> Types 지원 [x]

    console.log('props isRecording', isRecording);

    const [state, setState] = useState({
        isRecording: false,
        blobURL: '',
        isBlocked: false,
    });

    // New instance
    const [Mp3Recorder, setMp3Recorder] = useState(
        new MicRecorder({ bitRate: 128 }),
    );

    useEffect(() => {
        navigator.getUserMedia(
            { audio: true },
            () => {
                console.log('Permission Granted');
                setState({ isBlocked: false });
            },
            () => {
                console.log('Permission Denied');
                setState({ isBlocked: true });
            },
        );
    }, []);

    const start = async () => {
        console.log('1. start 실행');
        if (state.isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder.start()
                .then(() => {
                    console.log('2. [Mp3Recorder start]');
                    setState({ isRecording: true });
                })
                .catch((e) => console.error(e));
        }
    };

    const stop = async () => {
        console.log('3. stop 실행');
        Mp3Recorder.stop()
            .getMp3()
            .then(([buffer, blob]) => {
                console.log('4. [Mp3Recorder stop]');
                const blobURL = URL.createObjectURL(blob);
                setState({ blobURL, isRecording: false });

                const file = new File(buffer, '1_0.mp3', {
                    type: blob.type,
                    lastModified: Date.now(),
                });

                // TODO: file 전송
            })
            .catch((e) => console.log(e));
    };

    React.useEffect(() => {
        // isRecording이 true면 stop 실행
        // 처음에 isRecording이 false이기 때문에 바로 시작됨.
        //
        console.log(isRecording, typeof isRecording);
        if (isRecording === null) {
            return;
        }
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
            onClick={isRecording ? handleRecordStop : handleRecordStart} // 1. 클릭하면 isRecording: false -> true로 바뀜
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
