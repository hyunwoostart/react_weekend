import Banner from '../banner/Banner';
import Info from '../info/Info';
import News from '../news/News';
import Visual from '../visual/Visual';

function MainWrap() {
	return (
		<main>
			<Visual />
			<News />
			<Banner />
			<Info />
		</main>
	);
}

export default MainWrap;
