interface TextBoxWrapperProps {
    children: React.ReactNode;
}

export function TextBoxWrapper({ children }: TextBoxWrapperProps) {
    return (
        <div className="w-[82rem] h-fit p-[3.2rem] text-bodySmall text-black rounded-[2rem] border-[0.1rem] border-grey-5">
            {children}
        </div>
    );
}
