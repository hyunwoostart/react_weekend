import { useRef, useEffect, useCallback, useState } from 'react';
import './Info.scss';
import { useGetCurrentScroll } from '../../../hooks/useGetCurrentScroll';

function Info() {
	const [Frame, setFrame] = useState(null);
	const currentEl = useRef(null);
	const boxEl = useRef(null);
	const getScroll = useGetCurrentScroll(Frame);

	const handleScroll = useCallback(() => {
		const modifiedScroll = getScroll(currentEl);
		boxEl.current.style.transform = `rotate(${modifiedScroll}deg) scale(${1 + modifiedScroll / 300})`;
		boxEl.current.style.opacity = 1 - modifiedScroll / 600;
	}, [getScroll]);

	useEffect(() => {
		//Frame요소를 참조 객체에 담으면 state가 아니기 때문에 DOM요소가 추후에 담기더라도 컴포넌트가 재렌더링 안되고 이벤트연결아 안됨
		//해결방법: 해당요소를 State에 담아주고 해당 State를 의존성 배열로 해서 해당 값이 변경되면 다시 이벤트 연결 시도
		setFrame(currentEl.current?.closest('.wrap'));
	}, []);

	useEffect(() => {
		//Frame에 돔이 담겨서 재랜더링 되면 해다 구문안에서 이벤트 연결 (Banner.jsx도 동일하게 해결)
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	return (
		<section className='info myScroll' ref={currentEl}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}

export default Info;