import { useEffect, useState } from "react";

const DEFAULT_DELAY_MS = 500;

/**
 * 디바운스 커스텀 훅
 * 
 * @param value - 디바운스할 값
 * @param delay - 디바운스 지연 시간 (밀리초, 기본값: 500ms)
 * @returns 디바운스된 값
 */
export function useDebounce<T>(value: T, delay: number = DEFAULT_DELAY_MS): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}