import { useCallback } from 'react';

type Fn = (...args: any) => any;

let timer: NodeJS.Timeout | null = null;

// [사용법]
// const throttleFn = useThrottle((deps) => (fn, delay));

// [사용하는 곳]
// 페이지 스크롤 이벤트

const useThrottle = (deps: any) =>
    useCallback(
        (fn: Fn, delay: number = 200) => {
            return ((...args) => {
                // 처음에 timer가 0이거나 null같은 falsy일 때만 통과시킨다
                // 요청을 한번에 하나만 들어주고 아직 실행중인 예약이 있는 경우 요청을 받아들이지 않음
                if (!timer) {
                    fn(...args); // timer가 null인 경우 현재 수행중인 작업이 없으므로 fn 수행함

                    // 현재 실행중인 요청이 끝난 경우에만 (delay가 지나야) 다음 fn 수행 가능
                    timer = setTimeout(() => {
                        clearTimeout(timer as NodeJS.Timeout);
                        timer = null;
                    }, delay);
                }
            }) as Fn;
        },
        [deps],
    );

export default useThrottle;
