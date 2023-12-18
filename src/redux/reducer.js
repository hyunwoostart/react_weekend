import { combineReducers } from 'redux';
import * as types from './actionType';

const flickrReducer = (state = { flickr: [] }, action) => {
  switch (action.type) {
    //컴포넌트에서 dispatch로 전달되는 초기 action타입
    //해당 액션타입을 리듀서가 받자마자 해당 업무를 saga한테 전달
    //saga가 해당 액션타입을 전달받아서 데이터 fetching요청 시작 (success액션, fail액션 객체 생성)
    case types.FLICKR.start:
      return state;
    //saga가 전달한 action객체 타입이 success일때 데이터 가공
    case types.FLICKR.success:
      return { ...state, flickr: action.payload };
    //saga가 전달한 action객체 타입이 fail일때 데이터 가공
    case types.FLICKR.fail:
      return { ...state, flickr: action.payload };
    //위 3가지 경우의 액션타입이 아니면 아무런 작업하지 않고 기존 전역객체 내보냄
    default:
      return state;
  }
};

const reducers = combineReducers({ flickrReducer });
export default reducers;