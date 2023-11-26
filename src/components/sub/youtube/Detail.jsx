import Layout from '../../common/layout/Layout';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function Detail() {
	const [Data, setData] = useState(null);

	const { id } = useParams();
	const params = useRef(id);

	useEffect(() => {
		const api_key = 'AIzaSyDC60bIIkAJFzy7ji4a0Eo3AX6tYudhe1w';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${params.current}`;
		//fetchData(baseURL, setVids);

		fetch(baseURL)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.items[0]);
				setData(json.items[0]);
			});
	}, []);

	return (
		<Layout title={'Detail'}>
			<iframe
				width='100%'
				height='500'
				title='youtube'
				src={`https://www.youtube.com/embed/${Data?.snippet.resourceId.videoId}`}
			></iframe>
		</Layout>
	);
}

export default Detail;
