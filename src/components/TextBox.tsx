interface TextBoxProps {
    text: string;
}

export function TextBox({ text }: TextBoxProps) {
    return (
        <div className="w-[82rem] h-fit p-[3.2rem] text-bodySmall text-black rounded-[2rem] border-[0.1rem] border-grey-5">
            {text}
        </div>
    );
}
