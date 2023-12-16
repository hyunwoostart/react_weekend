import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

/* 
	--redux--
	store: 어떤 컴포넌트에서든 자유롭게 데이터를 공유할 수 있게 컴포넌트 외부에 있는 독립적인 전역데이터 공간
	reducer: 전역데이터를 변경해서 store 에 넘겨주는 변형자 함수 (action 객체를 받아야지만 전역데이터 변경가능) 
	action: 컴포넌트가 리듀서에 데이터 변경요청시 필요한 특별한 형태의 객체 {type: '타입', payload: '변경할데이터'}
	

	--react-redux--
	selector: 컴포넌트에서 전역 store에서 데이터를 호출
	dispatch: 컴포넌트에서 생성한 action객체를 reducer에 전달
*/
