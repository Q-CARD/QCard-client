import Image from 'next/image';

import { FaPause } from 'react-icons/fa';
import { BsFillPlayFill } from 'react-icons/bs';
import ImgBgCircle from '@/assets/images/image-yellow-circle.png';

interface RecoderProps {
    isRecording: boolean;
    handleRecordStart: () => void;
}

export default function Recoder({
    handleRecordStart,
    isRecording,
}: RecoderProps) {
    return (
        <div
            className="relative w-[6.4rem] h-[6.4rem] cursor-pointer"
            onClick={handleRecordStart}
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
