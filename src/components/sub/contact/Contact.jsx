import { useRef, useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
import emailjs from '@emailjs/browser';

export default function Contact() {
	const { kakao } = window;
	const mapFrame = useRef(null);
	const viewFrame = useRef(null);
	const mapInstance = useRef(null);
	const form = useRef(null);
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);

	const info = useRef([
		{
			title: '삼성역 코엑스-집에서세팅',
			latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},

		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	]);

	const marker = new kakao.maps.Marker({
		position: info.current[Index].latlng,
		image: new kakao.maps.MarkerImage(
			info.current[Index].imgSrc,
			info.current[Index].imgSize,
			info.current[Index].imgPos
		),
	});

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm('service_l76dw19', 'template_magnz0g', form.current, 'ojoroNYC5cWxmK1ra').then(
			(result) => {
				alert('문의내용이 성공적으로 전달되었습니다.');
				const [user, email] = form.current.querySelectorAll('input');
				const txtArea = form.current.querySelector('textarea');

				if (!user || !email || !txtArea)
					return alert('이름, 답장받을 메일 주소, 문의내용을 모두 입력하세요.');

				[(user, email, txtArea)].forEach((el) => (el.value = ''));

				user.value = '';
				email.value = '';
				txtArea.value = '';
			},
			(error) => {
				alert('문의내용 전송에 실패했습니다.');
				const [user, email] = form.current.querySelctorAll('input');
				const txtArea = form.current.querySelctor('textarea');

				[user, email, txtArea].forEach((el) => (el.value = ''));
			}
		);
	};

	const roadView = () => {
		//roadview setting
		//두번째 인수값 50(m단위)은 마커위치로부터 로드뷰가 출력될수 있는 가장 가까운 거리의 범위지정
		new kakao.maps.RoadviewClient().getNearestPanoId(info.current[Index].latlng, 50, (id) => {
			new kakao.maps.Roadview(viewFrame.current).setPanoId(id, info.current[Index].latlng);
		});
	};

	const setCenter = () => {
		mapInstance.current.setCenter(info.current[Index].latlng);
		roadView();
	};

	useEffect(() => {
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.maps.Map(mapFrame.current, {
			center: info.current[Index].latlng,
		});
		mapInstance.current.addControl(
			new kakao.maps.MapTypeControl(),
			kakao.maps.ControlPosition.TOPRIGHT
		);
		mapInstance.current.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
		mapInstance.current.setZoomable(false);
		marker.setMap(mapInstance.current);

		setTraffic(false);
		setView(false);
		roadView();

		window.addEventListener('resize', setCenter);
	}, [Index]);

	//교통정보 보기 토글 기능
	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	useEffect(() => {
		return () => window.removeEventListener('resize', setCenter);
	}, []);

	return (
		<Layout title={'Contact us'}>
			<div className='mailBox'>
				<form ref={form} onSubmit={sendEmail}>
					<label>Name</label>
					<input type='text' name='from_name' />
					<label>Email</label>
					<input type='email' name='user_email' />
					<label>Message</label>
					<textarea name='message' />
					<input type='reset' value='reset' />
					<input type='submit' value='Send' />
				</form>
			</div>

			<div className='container'>
				<article id='map' ref={mapFrame} className={View ? '' : 'on'}></article>
				<article id='view' ref={viewFrame} className={View ? 'on' : ''}></article>
			</div>

			<ul className='branch'>
				{info.current.map((el, idx) => (
					<li key={idx} className={idx === Index ? 'on' : ''} onClick={() => setIndex(idx)}>
						{el.title}
					</li>
				))}
			</ul>

			<button onClick={setCenter}>위치 초기화</button>
			{!View && (
				<button onClick={() => setTraffic(!Traffic)}>
					{Traffic ? '교통정보 끄기' : '교통정보 보기'}
				</button>
			)}
			<button onClick={() => setView(!View)}>{View ? '지도보기' : '로드뷰보기'}</button>
		</Layout>
	);
}
