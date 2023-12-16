import { useCustomText } from '../../../hooks/useText';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Youtube() {
	const [Vids, setVids] = useState([]);
	const shortenText = useCustomText('shorten');
	const changeText = useCustomText('combined');

	const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_KEY;
		const pid = process.env.REACT_APP_PLAYLIST;
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		const data = await fetch(baseURL);
		const json = await data.json();
		setVids(json.items);
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<Layout title={'Youtube'}>
			{Vids.map((data, idx) => {
				const [date, time] = data.snippet.publishedAt.split('T');

				return (
					<article key={idx}>
						<h2>{shortenText(data.snippet.title, 150)}</h2>

						<div className='txt'>
							<p>{shortenText(data.snippet.description, 200)}</p>
							<div className='infoBox'>
								<span>{changeText(date, '.')}</span>
								<em>{time.split('Z')[0]}</em>
							</div>
						</div>

						<div className='pic'>
							<Link to={`/detail/${data.id}`}>
								<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
							</Link>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}
