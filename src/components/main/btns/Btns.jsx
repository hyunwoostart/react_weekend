import './Btns.scss';
import { useRef, useEffect, useState } from 'react';
import Anime from '../../../asset/anime.js';
import { useThrottle } from '../../../hooks/useThrottle.js';

function Btns() {
	const [Num, setNum] = useState(0);
	const secs = useRef(null);
	const btns = useRef(null);
	const scrollFrame = btns.current?.parentElement.parentElement;

	const activation = () => {
		//console.log('activation');
		const scroll = btns.current?.parentElement.parentElement.scrollTop;
		console.log(scroll);
		secs.current.forEach((el, idx) => {
			if (scroll >= el.offsetTop - window.innerHeight / 2) {
				Array.from(btns.current.children).forEach((btn) => btn.classList.remove('on'));
				btns.current.children[idx]?.classList.add('on');

				secs.current.forEach((sec) => sec.classList.remove('on'));
				secs.current[idx].classList.add('on');
			}
		});
	};

	const activation2 = useThrottle(activation);

	const handleClick = (idx) => {
		new Anime(
			btns.current?.parentElement.parentElement,
			{ scroll: secs.current[idx].offsetTop },
			{ duration: 500 }
		);
	};

	useEffect(() => {
		secs.current = btns.current.parentElement.querySelectorAll('.myScroll');
		setNum(secs.current.length);
		//scroll이벤트는 throttle이 적용된 activation2함수를 연결
		btns.current?.parentElement.parentElement.addEventListener('scroll', activation2);
	}, [activation2]);

	useEffect(activation, [Num, scrollFrame]);

	return (
		<ul className='btns' ref={btns}>
			{Array(Num)
				.fill('abc')
				.map((_, idx) => {
					return <li key={_ + idx} onClick={() => handleClick(idx)}></li>;
				})}
		</ul>
	);
}

export default Btns;

//useCallback: 함수자체를 메모이제이션해서 해당 함수를 재활용
//useMemo: 함수의 리턴값 자체를 메모이제이션
//meno: 컴포넌트 자체를 메모이제이션

//고차컴포넌트(hoc): high order component
//인수로 컴포넌트를 전달받아서 새로운 컴포넌트를 반환

//hook의 조건
//1. 이름이 use로 시작
//2. 커스텀훅은 무조건 함수나 리턴값을 반환
//3. 다른 hook이나 핸들러함수 안쪽에 호출이 불가, 컴포넌트 함수 안쪽에서만 호출 가능

//throttle : 강제로 이벤트핸들러 호출횟수를 압박해서 줄이는 기법
//scroll, resize, mousemove, mousewheel : 단기간에 많은 핸들러를 호출하는 이벤트 (1초 60번, 화면주사율 60hz)
