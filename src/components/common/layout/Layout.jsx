import { useSplitText } from '../../../hooks/useText.js';
import './Layout.scss';
import { useEffect, useRef } from 'react';

export default function Layout({ children, title }) {
	let newClass = title.toLowerCase().split(' ').join('_');
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();

	useEffect(() => {
		splitText(refTitle, 0.1);
		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 600);
	}, []);

	return (
		<section ref={refFrame} className={`layout ${newClass}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{children}
		</section>
	);
}
