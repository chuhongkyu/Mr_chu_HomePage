import { useEffect, RefObject } from "react";

/**
 * 클릭 외부 감지 커스텀 훅
 * 
 * @param ref - 감지할 요소의 ref
 * @param callback - 외부 클릭 시 실행할 콜백 함수
 * @param enabled - 훅 활성화 여부 (기본값: true)
 */

export function useClickOutside<T extends HTMLElement>(
	ref: RefObject<T>,
	callback: () => void,
	enabled: boolean = true
) {
	useEffect(() => {
		if (!enabled) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, callback, enabled]);
}
