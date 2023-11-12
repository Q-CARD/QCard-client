import { useCallback } from 'react';

type Fn = (...args: any[]) => void;
let timer: NodeJS.Timeout | null = null; // 초기에는 null, 작업 완료되면 NodeJS.Timeout

// 고차함수(HOF: Higher-Order Function) - 함수를 매개변수로 사용하거나 함수를 반환하는 함수

// [사용법]
// const fnDebounced = useDebounce((deps) => (fn, delay));

const useDebounce = (deps: any) =>
    useCallback(
        <T extends (...args: any[]) => void>(fn: T, delay: number = 200) => {
            return (...args: Parameters<T>) => {
                // 이미 setTimeout으로 이벤트 핸들러가 등록된 적이 있는 경우 (이벤트 큐의 index)
                // 요청이 들어올 때마다 받아주고, 결국 가장 마지막 Fn이 실행됨
                // delay가 지나기 전에 새로운 입력이 들어오면 지난 예약은 모두 잊고, 새로운 예약을 설정함
                if (timer) {
                    // 이벤트 핸들러 큐에서 제거
                    clearTimeout(timer);
                    // 다시 timer를 초기화시켜 다음엔 if문이 통과하지 않도록 함
                    timer = null;
                }
                // 타이머 새롭게 정의
                // N ms 후에 실행할 이벤트를 이벤트 큐에 등록하고
                // 큐의 몇번 위치에 이벤트 핸들러가 등록되었는지 인덱스를 반환함
                timer = setTimeout(() => {
                    fn(...args);
                }, delay); // delay 후에 함수 실행
            };
        },
        [deps],
    );

export default useDebounce;
