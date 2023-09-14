export default function Loading() {
    return (
        <>
            <div className="flex text-center flex-col w-[85rem] items-center rounded-2xl py-[4rem] px-[4.8rem] gap-[3.2rem] self-stretch">
                <div className="text-heading3 rounded-2xl" />
                <h1 className="h-[3rem] w-3/5 mt-[2rem] bg-grey-2 text-specialHeading rounded-2xl"></h1>
                <div className="rounded-[2rem] h-[3.5rem] w-[7rem] my-[2px] mx-[13px] bg-grey-2 text-bodyExtraSmaller"></div>
                <div className="text-bodyDefault w-[3/5] rounded-3xl bg-grey-2 mt-[2.2rem] h-[3rem]"></div>

                <div
                    className={`w-full flex h-[3rem] flex-col justify-center items-center py-[2.4rem] px-[3.6rem] text-bodySmaller rounded-3xl bg-grey-2`}
                />
                <button className="flex justify-center h-[4rem] items-center w-full py-[2.4rem] px-[3.6rem] text-heading5 rounded-3xl bg-grey-2"></button>
            </div>
            <div className={`flex items-center mt-[2rem] gap-[1.4rem]`}></div>
            <button className="flex gap-[8px] h-[4rem] bg-grey-2 rounded-3xl items-center mt-[9rem] py-[2rem] px-[5.6rem]"></button>
        </>
    );
}
