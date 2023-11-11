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
	const marker = new kakao.maps.Marker({
		position: mapOption.center,
	});

	useEffect(() => {
		const map = new kakao.maps.Map(mapFrame.current, mapOption);
		marker.setMap(map);
	}, []);

	return (
		<Layout title={'Contact us'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
