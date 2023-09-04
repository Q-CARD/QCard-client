import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { ICategory } from '@/types';

interface CategoryCardProps {
    categoryInfo: ICategory;
}

export function CategoryCard({ categoryInfo }: CategoryCardProps) {
    const { id, name, image } = categoryInfo;

    const router = useRouter();

    const moveToCategoryQuestion = () => {
        router.push(`/category/${id}`);
    };

    return (
        <div
            className="w-fit h-fit px-[4.8rem] py-[6.6rem] rounded-[2rem] shadow-4 cursor-pointer flex flex-col items-center gap-[3.7rem]"
            onClick={moveToCategoryQuestion}
        >
            <Image
                src={image}
                alt={`category-${name}`}
                width={155}
                height={170}
            />
            <span className="text-heading5">{name}</span>
        </div>
    );
}
