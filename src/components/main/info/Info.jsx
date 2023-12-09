import { useRef, useEffect, useCallback } from 'react';
import './Info.scss';
import { useGetCurrentScroll } from '../../../hooks/useGetCurrentScroll';

function Info() {
	const currentEl = useRef(null);
	const boxEl = useRef(null);
	const scrollFrame = currentEl.current?.closest('.wrap');
	const getScroll = useGetCurrentScroll(scrollFrame);

	const handleClick = useCallback(() => {
		const modifiedScroll = getScroll(currentEl);
		boxEl.current.style.transform = `rotate(${modifiedScroll}deg) scale(${
			1 + modifiedScroll / 300
		})`;
		boxEl.current.style.opacity = 1 - modifiedScroll / 600;
	}, [getScroll]);

	useEffect(() => {
		scrollFrame?.addEventListener('scroll', handleClick);
		return () => scrollFrame?.removeEventListener('scroll', handleClick);
	}, [handleClick, scrollFrame]);

	return (
		<section className='info myScroll' ref={currentEl}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}

export default Info;
