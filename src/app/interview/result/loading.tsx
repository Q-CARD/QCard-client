export default function Loading() {
    return (
        <section className="flex flex-col bg-yellow-1">
            <div className="flex flex-col m-auto">
                <div className="py-[4.4rem]">
                    <div className="bg-grey-2 w-[27.8rem] h-[4.6rem] rounded-[1rem]" />
                </div>
                <div className="flex flex-col gap-[2rem] pb-[11.1rem]">
                    <section className="relative flex flex-col w-[93rem] h-[52.8rem] bg-white items-center rounded-[1rem]">
                        <div className="absolute w-[5.7rem] h-[5.7rem] top-[-2.8rem] left-[calc(50%-2.8rem)] bg-grey-2 rounded-[50%]" />
                        <div className="w-[52rem] h-[4.6rem] mt-[5.7rem] bg-grey-2 rounded-[1rem]" />
                        <div className="w-[78.8rem] h-[27.9rem] mt-[1.2rem] bg-grey-2 rounded-[1rem]" />
                        <div className="w-[78.6rem] h-[8rem] my-[2.6rem] bg-yellow-1 rounded-[1rem]" />
                    </section>
                    <div className="w-full h-[8rem] bg-blue-primary rounded-[1rem]" />
                </div>
            </div>
        </section>
    );
}
