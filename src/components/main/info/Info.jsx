import { useRef, useEffect } from 'react';
import './Info.scss';
import { useGetCurrentScroll } from '../../../hooks/useGetCurrentScroll';

function Info() {
	const currentEl = useRef(null);
	const boxEl = useRef(null);
	const getScroll = useGetCurrentScroll();

	const handleClick = () => {
		const modifiedScroll = getScroll(currentEl);
		boxEl.current.style.transform = `rotate(${modifiedScroll}deg) scale(${
			1 + modifiedScroll / 300
		})`;
		boxEl.current.style.opacity = 1 - modifiedScroll / 600;
	};

	useEffect(() => {
		window.addEventListener('scroll', handleClick);
		return () => window.removeEventListener('scroll', handleClick);
	}, []);

	return (
		<section className='info myScroll' ref={currentEl}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}

export default Info;
