import Image from 'next/image';
import Link from 'next/link';
import { ICategory } from '@/types';

interface CategoryCardProps {
    categoryInfo: ICategory;
}

export function CategoryCard({ categoryInfo }: CategoryCardProps) {
    const { id, name, image } = categoryInfo;

    return (
        <Link href={`/category/${id}`}>
            <div className="w-fit h-fit px-[5rem] pt-[3rem] pb-[2.5rem] rounded-[2rem] shadow-buttonColor2 cursor-pointer flex flex-col items-center gap-[2.8rem]">
                <Image
                    src={image}
                    alt={`category-${name}`}
                    width={155}
                    height={155}
                />
                <span className="text-black text-heading5">{name}</span>
            </div>
        </Link>
    );
}
