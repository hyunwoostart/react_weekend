import { combineReducers } from 'redux';

const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

//순서1 - 리듀서함수가 실행되는 시점에는 전역에 담을 비동기 데이터가 없으므로 빈배열로 전역state 초기화
const reducers = combineReducers({ memberReducer });
export default reducers;
