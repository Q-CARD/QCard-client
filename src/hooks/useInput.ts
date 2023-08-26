// useInput.tsx
import { useState, useCallback } from 'react';

type useInputReturnType = [
    value: string | number,
    handler: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => void,
    set: (value: string | number) => void,
    reset: () => void,
];

function useInput(initialValue: string | number): useInputReturnType {
    const [value, setValue] = useState<string | number>(initialValue);

    const handler = useCallback(
        (
            e:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>,
        ) => setValue((prev) => e.target.value),
        [],
    );

    const reset = useCallback(() => setValue((prev) => initialValue), []);

    const set = useCallback((value: string | number) => setValue(value), []);

    return [value, handler, set, reset];
}

export default useInput;
