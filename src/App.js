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
import { useEffect, useRef, useState } from 'react';
import Menu from './components/common/menu/Menu';
import { useDispatch } from 'react-redux';

function App() {
	const dispatch = useDispatch();
	const [IsDark, setIsDark] = useState(false);
	const [IsMenu, setIsMenu] = useState(false);
	const path = useRef(process.env.PUBLIC_URL);

	//순서2 - Department비동기 데이터를 fetching후 action객체로 만들어서 리듀서로 데이터 변경요청 함수 추가
	const fetchDepartment = async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		dispatch({ type: 'SET_MEMBERS', payload: json.members });
	};

	// 순서3 - App컴포넌트가 마운트되자마자 위의 fetching 및 전역 state 변경요청함수 실행
	// 처음 렌더링시에는 state가 빈배열이므로 값이 없지만 두번째 렌더링시 전역 state값 호출가능
	useEffect(() => {
		fetchDepartment();
	}, []);

	return (
		<main className={`wrap ${useMedia()} ${IsDark ? 'dark' : ''}`}>
			<Switch>
				<Route exact path='/'>
					<Header isMain={true} IsDark={IsDark} setIsDark={setIsDark} IsMenu={IsMenu} setIsMenu={setIsMenu} />
					<MainWrap />
				</Route>
				<Route path='/'>
					<Header isMain={false} IsDark={IsDark} setIsDark={setIsDark} IsMenu={IsMenu} setIsMenu={setIsMenu} />
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
			<Menu IsMenu={IsMenu} setIsMenu={setIsMenu} />
		</main>
	);
}

export default App;
