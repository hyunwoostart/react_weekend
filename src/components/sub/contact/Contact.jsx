import { useRef, useEffect } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const { kakao } = window;
	const mapFrame = useRef(null);

	const info = useRef([
		{
			title: '삼성역 코엑스',
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
		position: info.current[1].latlng,
		image: new kakao.maps.MarkerImage(
			info.current[1].imgSrc,
			info.current[1].imgSize,
			info.current[1].imgPos
		),
	});

	useEffect(() => {
		const map = new kakao.maps.Map(mapFrame.current, { center: info.current[1].latlng });
		marker.setMap(map);
	}, []);

	return (
		<Layout title={'Contact us'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
