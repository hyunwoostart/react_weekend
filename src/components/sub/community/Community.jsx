import './Community.scss';
import Layout from '../../common/layout/Layout';
import { TfiWrite } from 'react-icons/tfi';
import { RxReset } from 'react-icons/rx';
import { useRef, useState, useEffect } from 'react';

function Comunity() {
	const getLocalData = () => {
		const data = localStorage.getItem('posts');
		if (data) return JSON.parse(data);
		else return [];
	};
	const refInput = useRef(null);
	const refTextarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);
	const [Posts, setPosts] = useState(getLocalData());
	const [Allowed, setAllowed] = useState(true);
	console.log(Posts);

	const resetPost = () => {
		refInput.current.value = '';
		refTextarea.current.value = '';
	};

	const createPost = () => {
		if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;

		setPosts([
			{
				title: refInput.current.value,
				content: refTextarea.current.value,
				date: new Date(korTime),
			},
			...Posts,
		]);
		resetPost();
	};

	const deletePost = (delIndex) => {
		setPosts(Posts.filter((_, idx) => delIndex !== idx));
	};

	const enableUpdate = (editIndex) => {
		//Allowed값이 true일때에만 수정모드 진입가능하게 처리
		if (!Allowed) return;
		//일단 수정모드에 진입하면 Allowed값을 false로 변경해서 추가적으로 수정모드 진입불가처리
		setAllowed(false);
		setPosts(
			//기존의 Posts배열을 반복돌면서 파라미터전달된 editIndex순번에 해다는 post객체에만 enableUpdate=true값을 추가한 객체의 배열값을 다시 기존 Posts에 변경
			Posts.map((post, idx) => {
				if (editIndex === idx) post.enableUpdate = true;
				return post;
			})
		);
	};

	const disableUpdate = (cancelIndex) => {
		//수정취소시 다시 Allowed값 true변경해서 수정모드 가능하게 변경
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				if (cancelIndex === idx) post.enableUpdate = false;
				return post;
			})
		);
	};

	const updatePost = (updateIndex) => {
		if (!editInput.current.value.trim() || !editTextarea.current.value.trim())
			return alert('수정할 글의 제목과 본문을 모두 입력하세요.');
		//수정완료시에도 다시 Allowed값 true변경해서 수정모드 가능하게 변경
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				//전달된 수정번호와 현재 반복도는 post순번이 같으면
				if (updateIndex === idx) {
					//수정모드의 폼요소값을 담아주고 enableUpdate값을 false로 변경해서 다시 출력모드 변경
					post.title = editInput.current.value;
					post.content = editTextarea.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);
	};

	useEffect(() => {
		localStorage.setItem('posts', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<input type='text' placeholder='Write Title' ref={refInput} />
					<textarea
						cols='30'
						rows='5'
						placeholder='Write Content Message'
						ref={refTextarea}
					></textarea>

					<nav>
						<button onClick={resetPost}>
							<RxReset fontSize={20} color={'#555'} />
						</button>
						<button onClick={createPost}>
							<TfiWrite fontSize={20} color={'#555'} />
						</button>
					</nav>
				</div>

				<div className='showBox'>
					{Posts.map((post, idx) => {
						const stringDate = JSON.stringify(post.date);
						const textedDate = stringDate.split('T')[0].split('"')[1].split('-').join('.');
						if (post.enableUpdate) {
							//수정모드
							return (
								<article key={idx}>
									<div className='txt'>
										<input type='text' defaultValue={post.title} ref={editInput} />
										<textarea defaultValue={post.content} ref={editTextarea}></textarea>
									</div>
									<nav>
										<button onClick={() => disableUpdate(idx)}>Cancel</button>
										<button onClick={() => updatePost(idx)}>Update</button>
									</nav>
								</article>
							);
						} else {
							//출력모드
							return (
								<article key={idx}>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
										<span>{textedDate} </span>
									</div>
									<nav>
										<button onClick={() => enableUpdate(idx)}>Edit</button>
										<button onClick={() => deletePost(idx)}>Delete</button>
									</nav>
								</article>
							);
						}
					})}
				</div>
			</div>
		</Layout>
	);
}

export default Comunity;

/*
	글수정 로직 단계
	1. 각 포스트에서 수정 버튼 클릭시 해당 객체에 enableUpdate=true라는 프로퍼티추가후 state저장
	2. 반복돌며 렌더링시 반복도는 객체에 enableUpdate값이 true면 제목, 본문을 폼요소 출력하도록 분기처리
	3. 수정모드일때에는 수정취소, 수정완료 버튼 생성
	4. 수정취소버튼 클릭시 출력모드로 변경 (enableUpdat=false처리)
	5. 수정완료버튼 클릭시 수정모드에 있는 value값을 가져와서 state에 저장한뒤 다시 출력모드로 변경처리
*/
