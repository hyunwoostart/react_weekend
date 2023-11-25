import { useRef } from 'react';

//인수로 throttle을 적용한 함수를 전달받음
export function useThrottle(func) {
	//내부적으로 useRef를 통해서 setTimeout의 리턴값을 받을 참조객체 생성 (커스텀훅이기 때문에 내장훅 활용가능)
	const eventBlocker = useRef(null);

	return () => {
		//인수로 받은 함수에 setTimeout을 적용해서 throttling기능이 반영된 새로운 함수를 내보냄
		//고차함수 (hof)
		if (eventBlocker.current) return;
		eventBlocker.current = setTimeout(() => {
			func();
			eventBlocker.current = null;
		}, 500);
	};
}
