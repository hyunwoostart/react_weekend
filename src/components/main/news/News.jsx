import './News.scss';
import { useState } from 'react';

function News() {
	const getLocalData = () => {
		const data = localStorage.getItem('posts');
		if (data) return JSON.parse(data);
		else return [];
	};

	const [News] = useState(getLocalData());

	return (
		<section className='news'>
			{News.map((post, idx) => {
				if (idx >= 3) return null;
				return <h2 key={idx}>{post.title}</h2>;
			})}
		</section>
	);
}

export default News;
