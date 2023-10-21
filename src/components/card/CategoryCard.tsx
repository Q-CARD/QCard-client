import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '@/store/recoil';
import { ICategory } from '@/types';

interface CategoryCardProps {
    categoryInfo: ICategory;
}

export function CategoryCard({ categoryInfo }: CategoryCardProps) {
    const { id, name, image } = categoryInfo;

    const router = useRouter();
    const isLogin = useRecoilValue(isLoginAtom);

    // path 진입 전 로그인 여부 검사
    const beforeEnter = (path: string) => {
        if (isLogin) {
            router.push(path);
        } else {
            alert('로그인이 필요한 기능입니다');
            router.push('/auth/login');
        }
    };

    return (
        <div
            className="w-fit h-fit px-[5rem] pt-[3rem] pb-[2.5rem] rounded-[2rem] shadow-buttonColor2 cursor-pointer flex flex-col items-center gap-[2.8rem]"
            onClick={() => beforeEnter(`/category/${id}`)}
        >
            <Image
                src={image}
                alt={`category-${name}`}
                width={155}
                height={155}
            />
            <span className="text-black text-heading5">{name}</span>
        </div>
    );
}
