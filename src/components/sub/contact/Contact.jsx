import { useRef, useEffect } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const { kakao } = window;
	//api 적용할 요소도 가상돔이기 때문에 참조객체에 연결
	const mapFrame = useRef(null);
	const mapOption = {
		center: new kakao.maps.LatLng(37.51177006335203, 127.05745288988979),
		level: 3,
	};

	useEffect(() => {
		const map = new kakao.maps.Map(mapFrame.current, mapOption);
		marker.setMap(map);
	}, []);

	// 마커이미지 인스턴스를 생성하기 위한 정보값들
	const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
	const imageSize = new kakao.maps.Size(64, 69);
	const imageOption = { offset: new kakao.maps.Point(27, 69) };
	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

	const marker = new kakao.maps.Marker({
		position: mapOption.center,
		image: markerImage,
	});

	return (
		<Layout title={'Contact us'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
