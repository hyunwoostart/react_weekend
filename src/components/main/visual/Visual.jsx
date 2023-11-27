import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { useEffect, useState, useRef } from 'react';

export default function Visual() {
	const [SlideData, setSlideData] = useState([]);
	const path = useRef(process.env.PUBLIC_URL);

	const fetchData = async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		console.log(json.members);
		setSlideData(json.members);
	};

	useEffect(() => {
		//외부데이터 fetching (web api의 기능을 필요로)
		//가상돔에 이벤트 연결 혹은 추가 속성 (web api의 기능을 필요로)
		fetchData();
	}, []);

	return (
		<figure className='myScroll'>
			<Swiper
				modules={[Autoplay]}
				spaceBetween={50}
				slidesPerView={3}
				loop={true}
				centeredSlides={true}
				autoplay={{ delay: 2000, disableOnInteraction: false }}
			>
				{SlideData.map((data, idx) => {
					return (
						<SwiperSlide key={idx}>
							<div className='pic'>
								<img src={`${path.current}/img/${data.pic}`} alt={data.name} />
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}

/*
	swiper연결 순서
	1. npm i swiper@8 설치 (현재 버전은 9버전이지만 react가 17버전이므로 8버전대 설치)
	2. swiper가이드문서 예시코드 그대로 붙여넣기
	3. .swiper> .swiper-wrapper > .swiper-slide 해당구조를 파악해서 styling
*/