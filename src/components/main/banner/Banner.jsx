import './Banner.scss';
import { useRef, useEffect } from 'react';

export default function Banner() {
	console.log('Banner Called');
	const currentEl = useRef(null);
	const titleEl = useRef(null);

	const handleScroll = () => {
		const scroll = window.scrollY;
		const modifiedScroll = scroll - currentEl.current?.offsetTop;
		console.log(modifiedScroll);
		titleEl.current.style.transform = `translateX(${modifiedScroll}px)`;
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<section className='banner myScroll' ref={currentEl}>
			<h1 ref={titleEl}>Banner</h1>
		</section>
	);
}
