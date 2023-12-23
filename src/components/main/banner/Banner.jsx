import { useSelector } from 'react-redux';
import { useGetCurrentScroll } from '../../../hooks/useGetCurrentScroll';
import './Banner.scss';
import { useRef, useEffect, useCallback, useState } from 'react';

export default function Banner() {
	const Pics = useSelector(store => store.flickrReducer.flickr);
	const [Frame, setFrame] = useState(null);

	const currentEl = useRef(null);
	const titleEl = useRef(null);
	const getScroll = useGetCurrentScroll(Frame);

	const handleScroll = useCallback(() => {
		console.log('handleScroll');
		const modifiedScroll = getScroll(currentEl);
		titleEl.current.style.transform = `translateX(${modifiedScroll}px)`;
	}, [getScroll]);

	useEffect(() => {
		setFrame(currentEl.current?.closest('.wrap'));
	}, []);

	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	return (
		<section
			className='banner myScroll'
			ref={currentEl}>
			<h1 ref={titleEl}>Banner</h1>

			<ul>
				{Pics.map((pic, idx) => {
					if (idx >= 5) return null;
					return (
						<article key={idx}>
							<h3>{pic.title}</h3>
							<img
								src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
								alt={pic.title}
							/>
						</article>
					);
				})}
			</ul>
		</section>
	);
}
