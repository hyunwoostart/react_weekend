import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
//import { Autoplay } from 'swiper';
import 'swiper/css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCustomText } from '../../../hooks/useText';
import { useSelector } from 'react-redux';

export default function Visual() {
	const SlideData = useSelector(store => store.youtubeReducer.youtube);
	console.log(SlideData);
	const [Index, setIndex] = useState(0);
	const shortenText = useCustomText('shorten');

	return (
		<figure className='myScroll'>
			<div className='txtBox'>
				<ul>
					{SlideData.map((tit, idx) => {
						if (idx >= 5) return null;
						return (
							<li
								key={idx}
								className={idx === Index ? 'on' : ''}>
								<h3>{shortenText(tit.snippet.title, 50)}</h3>
								<Link to={`/detail/${tit.id}`}>
									<em>View Detail</em>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>

			<Swiper
				spaceBetween={0}
				slidesPerView={1}
				loop={true}
				centeredSlides={true}
				onSlideChange={el => setIndex(el.realIndex)}
				breakpoints={{
					1000: {
						slidesPerView: 2,
						spaceBetween: 50
					},
					1400: {
						slidesPerView: 3,
						spaceBetween: 50
					}
				}}>
				{SlideData.map((data, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={idx}>
							<div className='pic'>
								<p>
									<img
										src={data.snippet.thumbnails.standard.url}
										alt={data.snippet.title}
									/>
								</p>

								<p>
									<img
										src={data.snippet.thumbnails.standard.url}
										alt={data.snippet.title}
									/>
								</p>
							</div>
							<h3>{data.snippet.title}</h3>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}
