import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { useState, useEffect, useRef, useCallback } from 'react';
import { LuSearch } from 'react-icons/lu';
import Modal from '../../common/modal/Modal';
import { useDispatch } from 'react-redux';

export default function Gallery() {
	const dispatch = useDispatch();
	const myID = '197119297@N02';
	const [Pics, setPics] = useState([]);
	let [IsUser, setIsUser] = useState(myID);
	let [CurrentType, setCurrentType] = useState('mine');
	const [Index, setIndex] = useState(0);
	const refElBtnSet = useRef(null);
	const refElInput = useRef(null);

	const fetchFlickr = useCallback(
		async opt => {
			console.log('fetching again...');
			const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
			const key = process.env.REACT_APP_FLICKR_KEY;
			const method_interest = 'flickr.interestingness.getList';
			const method_user = 'flickr.people.getPhotos';
			const method_search = 'flickr.photos.search';
			const num = 40;
			let url = '';
			const url_interest = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
			const url_user = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.id}`;
			const url_search = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.keyword}`;

			opt.type === 'user' && (url = url_user);
			opt.type === 'interest' && (url = url_interest);
			opt.type === 'search' && (url = url_search);

			const data = await fetch(url);
			const json = await data.json();
			if (json.photos.photo.length === 0) {
				const [btnInterest, btnMine] = refElBtnSet.current.querySelectorAll('button');
				CurrentType === 'interest' && btnInterest.classList.add('on');
				CurrentType === 'mine' && btnMine.classList.add('on');
				return alert('해당 검색어의 결과값이 없습니다.');
			}
			setPics(json.photos.photo);
		},
		[CurrentType]
	);

	const activateBtn = e => {
		const btns = refElBtnSet.current.querySelectorAll('button');
		btns.forEach(btn => btn.classList.remove('on'));
		if (e.target.nodeName === 'BUTTON') e.target.classList.add('on');
	};

	const handleClickInterest = e => {
		if (e.target.classList.contains('on')) return;
		//inertestGallery함수가 호출시 IsUser값을 빈문자열 처리 (falsy)
		setIsUser('');
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
		setCurrentType('interest');
	};

	const handleClickMine = e => {
		//마이갤러리 함수 호출시에는 IsUser의 문자값이 담겨있더라도 내아이디값이랑 똑같지 않으면 핸들러 호출함
		//다른 사용자 갤러리를 갔다가 My Gallery 함수 호출시 이미 IsUser값이 담겨있기 때문에 해당 함수가 호출되지 않는 문제 해결위함
		if (e.target.classList.contains('on') || IsUser === myID) return;
		setIsUser(myID);
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID });
		setCurrentType('mine');
	};

	const handleClickUser = e => {
		//IsUser값이 있기만 하면 핸들러함수 호출 중지
		if (IsUser) return;
		setIsUser(e.target.innerText);
		activateBtn(e);
		fetchFlickr({ type: 'user', id: e.target.innerText });
		setCurrentType('user');
	};

	const handleSubmit = e => {
		e.preventDefault();
		const tags = refElInput.current.value;
		refElInput.current.value = '';
		if (!tags.trim()) return;
		setIsUser('');
		activateBtn(e);
		fetchFlickr({ type: 'search', keyword: tags });
		setCurrentType('search');
	};

	const handleModal = idx => {
		dispatch({ type: 'SET_MODAL', payload: true });
		setIndex(idx);
	};

	useEffect(() => {
		fetchFlickr({ type: 'user', id: myID });
	}, [fetchFlickr]);

	return (
		<>
			<Layout title={'Gallery'}>
				<article className='controls'>
					<nav className='btnSet' ref={refElBtnSet}>
						<button onClick={handleClickInterest}>Interest Gallery</button>
						<button className='on' onClick={handleClickMine}>
							My Gallery
						</button>
					</nav>

					<form onSubmit={handleSubmit}>
						<input type='text' placeholder='Search' ref={refElInput} />
						<button className='btnSearch'>
							<LuSearch fontSize={20} color={'#bbb'} />
						</button>
					</form>
				</article>

				<div className='frame'>
					<Masonry
						elementType={'div'}
						options={{ transitionDuration: '0.5s' }}
						disableImagesLoaded={false}
						updateOnEachImageLoad={false}>
						{Pics.map((pic, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div className='pic' onClick={() => handleModal(idx)}>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`}
												alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
											/>
										</div>
										<h2>{pic.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt={pic.owner}
												onError={e => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/>
											<span onClick={handleClickUser}>{pic.owner}</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			<Modal>
				{/* 첫번째 렌더링 사이클에서 배열값이 비어있는 경우는 에러가 아니지만 없는 객체의 특정 property접근은 에러상황이기 때문에 해당 객체값이 있을때에만 특정 요소를 렌더링되게 하거나 아니면 옵셔널 체이닝 처리를 해서 첫번째 렌더링시의 오류 해결 */}
				{Pics[Index] && (
					<img
						src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
						alt='pic'
					/>
				)}
			</Modal>
		</>
	);
}
