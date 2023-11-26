import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState, useRef } from 'react';

//0. fetching될 데이터가 담길 State생성
//1. DB폴더의 데이터를 fetching한뒤 state에 담는함수 추가 (async await)
//2. useEffet안쪽에서 해당 함수 호출
//3. return문 안쪽에서 state에 담겨있는 배열을 반복돌면서 원하는 형태로 JSX를 리턴

export default function Visual() {
	const [SlideData, setSlideData] = useState([]);
	//바뀌지 않는 정적인 값을 담을때에는 가급적 참조객체에 담아줌
	//일반변수로 담으면 다시 useMemo를 통해서 메모이제이션해야 되는 번거로움을 피하기 위함
	const path = useRef(process.env.PUBLIC_URL);

	const fetchData = async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		console.log(json.members);
		setSlideData(json.members);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<figure className='myScroll'>
			<Swiper spaceBetween={50} slidesPerView={3} loop={true}>
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
