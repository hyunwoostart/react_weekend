import './Btns.scss';
import { useRef, useEffect, useState } from 'react';

function Btns() {
	const [Index, setIndex] = useState(0);
	const num = useRef(0);

	const handleClick = (idx) => {
		setIndex(idx);
	};
	useEffect(() => {
		num.current = document.body.querySelectorAll('.myScroll').length;
	}, []);

	console.log(num.current);
	return (
		<ul className='btns'>
			{Array(num.current)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							className={idx === Index ? 'on' : ''}
							onClick={() => handleClick(idx)}
						></li>
					);
				})}
		</ul>
	);
}

export default Btns;
