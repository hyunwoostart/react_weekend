import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import Visual from './components/main/visual/Visual';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Community from './components/sub/community/Community';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Detail from './components/sub/youtube/Detail';
import Youtube from './components/sub/youtube/Youtube';
import { useMedia } from './hooks/useMedia';
import './styles/Global.scss';
import { Route, Switch } from 'react-router-dom';
import MainWrap from './components/main/mainWrap/MainWrap';
import Parent from './Parent';

function App() {
	return (
		<main className={useMedia()}>
			<Parent />
			{/* 중첩된 라우터로 복수개의 동일한 컴포넌트가 연결될때 처음 연결라우터만 호출하고 나머지는 무시 */}
			<Switch>
				<Route exact path='/'>
					<Header isMain={true} />
					<MainWrap />
				</Route>
				<Route path='/'>
					<Header isMain={false} />
				</Route>
			</Switch>
			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/detail/:id' component={Detail} />
			<Footer />
		</main>
	);
}

export default App;
