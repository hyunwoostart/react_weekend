import { useCustomText } from '../../../hooks/useText';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Youtube() {
	const Vids = useSelector(store => store.youtubeReducer.youtube);
	const shortenText = useCustomText('shorten');
	const changeText = useCustomText('combined');

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
								<img
									src={data.snippet.thumbnails.standard.url}
									alt={data.snippet.title}
								/>
							</Link>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}
