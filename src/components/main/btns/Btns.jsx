import './Btns.scss';
import { useRef, useEffect, useState } from 'react';
import Anime from '../../../asset/anime.js';

// document.querySelector vs useRef (DOM) (참고로 둘다 realDOM을 제어)
// document.querySelector : 이미 이전 렌더링 사이클에서 돔으로 변경된 신뢰할 수 없는 예전 돔
// useRef : 똑같이 RealDOM을 담긴하지만 앞으로 realDOM으로 변화될 신뢰할 수 있는 최신 돔 상태

// State vs useRef 해당 값의 변경 및 적용 시점
// state값은 해당 렌더링 사이트에서 값이 변경되는 것은 맞지만 실제 그 값이 적용되는 시점은 다음번 렌더링 사이클
// useRef은 해당 렌더링사이클에 값도 변경되고 바로 반영도 됨

function Btns() {
	//section의 전체 갯수가 담길 값을 참조객체에서 state로 변경
	//Num값 변경시 컴포넌트가 재랜더링되어야 버튼이 생기므로 state처리
	const [Num, setNum] = useState(0);
	const secs = useRef(null);
	const btns = useRef(null);

	//컴포넌트 마운트시 윈도우 스크롤이벤트에 연결될 함수
	const activation = () => {
		const scroll = window.scrollY;
		secs.current.forEach((el, idx) => {
			if (scroll >= el.offsetTop - window.innerHeight / 2) {
				Array.from(btns.current.children).forEach((btn) => btn.classList.remove('on'));
				//btns의 li요소가 동적으로 생성되기 전에 호출시 오류를 피하기 위해서 optional chaining처리
				btns.current.children[idx]?.classList.add('on');

				secs.current.forEach((sec) => sec.classList.remove('on'));
				secs.current[idx].classList.add('on');
			}
		});
	};

	const handleClick = (idx) => {
		new Anime(window, { scroll: secs.current[idx].offsetTop }, { duration: 500 });
	};

	//컴포넌트 마운트시
	useEffect(() => {
		//빈 참조객체에 버튼과 section요소 담아줌
		secs.current = document.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		//window scroll이벤트에 activation함수 연결
		window.addEventListener('scroll', activation);

		return () => {
			window.removeEventListener('scroll', activation);
		};
	}, []);

	//Num state변경시 activation호출
	useEffect(() => {
		//마운트시 section의 첫번째 요소에 on을 붙여주기 위함
		activation();
	}, [Num]);

	return (
		<ul className='btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return <li key={idx} onClick={() => handleClick(idx)}></li>;
				})}
		</ul>
	);
}

export default Btns;
