export default function QuestionSkeleton() {
    return (
        <section className="relative flex flex-col w-[93rem] h-[41.8rem] bg-white items-center rounded-[1rem]">
            <div className="absolute w-[5.7rem] h-[5.7rem] top-[-2.8rem] left-[calc(50%-2.8rem)] bg-grey-2 rounded-[50%]" />
            <div className="w-[52rem] h-[4.6rem] mt-[5.7rem] bg-grey-2 rounded-[1rem]" />
            <div className="w-[78.8rem] h-[27.9rem] mt-[1.2rem] bg-grey-2 rounded-[1rem]" />
        </section>
    );
}
