import { combineReducers } from 'redux';

const initMemberData = {
	members: [
		{
			name: 'David',
			position: 'President',
			pic: 'member1.jpg'
		},
		{
			name: 'Julia',
			position: 'Vice President',
			pic: 'member2.jpg'
		},
		{
			name: 'Emily',
			position: 'UI Designer',
			pic: 'member3.jpg'
		},
		{
			name: 'Michael',
			position: 'Front-end Developer',
			pic: 'member4.jpg'
		},
		{
			name: 'Emma',
			position: 'Back-end Developer',
			pic: 'member5.jpg'
		},
		{
			name: 'Peter',
			position: 'Project Manager',
			pic: 'member6.jpg'
		}
	]
};

// 초기 데이터를 전역 state에 저장하고 추후 action객체가 넘어오면 action의 type에 따라서 해당 전역데이터를 변경해주는 변형자함수 생성: reducer
// action {type: 'SET_MEMBERS', payload:[memberData]}
const memberReducer = (state = initMemberData, action) => {
	if (action.type === 'SET_MEMBERS') {
		return { ...state, members: action.payload };
	} else {
		return state;
	}
};

// 해당 reducer함수가 반환하는 객체를 외부로 export
const reducers = combineReducers({ memberReducer });
export default reducers;
