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
import { useEffect } from 'react';
import Menu from './components/common/menu/Menu';
import { useDispatch, useSelector } from 'react-redux';
import * as types from './redux/actionType';

function App() {
	const dispatch = useDispatch();
	const IsDark = useSelector(store => store.darkReducer.dark);

	useEffect(() => {
		Object.keys(types).forEach(actionType => dispatch({ type: types[actionType].start }));
	}, [dispatch]);

	return (
		<main className={`wrap ${useMedia()} ${IsDark ? 'dark' : ''}`}>
			<Switch>
				<Route
					exact
					path='/'>
					<Header isMain={true} />
					<MainWrap />
				</Route>
				<Route path='/'>
					<Header isMain={false} />
				</Route>
			</Switch>
			<Route
				path='/department'
				component={Department}
			/>
			<Route
				path='/community'
				component={Community}
			/>
			<Route
				path='/gallery'
				component={Gallery}
			/>
			<Route
				path='/youtube'
				component={Youtube}
			/>
			<Route
				path='/members'
				component={Members}
			/>
			<Route
				path='/contact'
				component={Contact}
			/>
			<Route
				path='/detail/:id'
				component={Detail}
			/>
			<Footer />
			<Menu />
		</main>
	);
}

export default App;
