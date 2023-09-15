import Image from 'next/image';

import defaultImage from '@/assets/images/image-default-profile.png';

interface ProfileProps {
    account: {
        name: string;
        email: string;
    };
}

export function Profile({ account }: ProfileProps): React.JSX.Element {
    return (
        <div className="w-[19.9rem] px-[1rem] flex items-center gap-[1rem]">
            <Image
                src={defaultImage}
                alt="profile-image"
                width={48}
                height={48}
            />
            <span className="text-bodyDefault text-grey-6">{account.name}</span>
        </div>
    );
}
