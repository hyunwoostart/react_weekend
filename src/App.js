import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Community from './components/sub/community/Community';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Detail from './components/sub/youtube/Detail';
import Youtube from './components/sub/youtube/Youtube';
import { useMedia } from './hooks/useMedia';
import './styles/Variable.scss';
import './styles/Global.scss';
import { Route, Switch } from 'react-router-dom';
import MainWrap from './components/main/mainWrap/MainWrap';
import { useState } from 'react';

//asset > anime.js
//mainWrap > Btns.jsx
//mainWrap > Banner.jsx
//hooks > useGetCurrentScroll.js
//vercel에 환경변수 추가
function App() {
	const [IsDark, setIsDark] = useState(false);

	return (
		<main className={`wrap ${useMedia()} ${IsDark ? 'dark' : ''}`}>
			{/* 중첩된 라우터로 복수개의 동일한 컴포넌트가 연결될때 처음 연결라우터만 호출하고 나머지는 무시 */}
			<Switch>
				<Route exact path='/'>
					<Header isMain={true} IsDark={IsDark} setIsDark={setIsDark} />
					<MainWrap />
				</Route>
				<Route path='/'>
					<Header isMain={false} IsDark={IsDark} setIsDark={setIsDark} />
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