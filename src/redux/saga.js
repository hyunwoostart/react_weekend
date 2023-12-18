/*
  saga 전용 내장 함수들
  takeLatest(제일 마지막 요청만 수행), takeEvery (들어오는 모든 요청을 전부수행)
  call (saga에서 api관련 axios함수를 호출하때 쓰는 함수, 두번째 인수값 전달가능)
  put (saga에서 만들어진 액션객체를 리듀서에 전달, 기존 dispatch랑 동일 )
  fork (saga에서 제너레이터 호출 및 이터러블 객체 반환 함수)  
  all (이터러블 객체 비동기적으로 그룹호출 함수)
*/
import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr } from './api';
import * as types from './actionType';

//리듀서에 요청받은 초기 action타입을 가로채서 fetching관련 saga함수
function* callFlickr() {
  //컴포넌트에서 FLICIKR_START타입 액션객체가 전달되면 해당 이벤트를 takeLatest가 받아서 returnFlickr함수 호출
  yield takeLatest('FLICKR_START', returnFlickr);
}

//callFlickr에 의해 호출되며 외부 api함수 호출해 결과값을 액션 객체로 만들어 반환하는 saga함수
function* returnFlickr(action) {
  try {
    //fetchFlcker에는 인수로 Opt객체가 전달되야 되기 때문에 컴포넌트에서 {type: 'FLICKR_START', Opt: {type: 'user', user:'사용자아이디'}}
    const response = yield call(fetchFlickr, action.Opt);
    yield put({
      type: types.FLICKR.success,
      payload: response.photos.photo,
    });
  } catch (err) {
    yield put({ type: types.FLICKR.fail, payload: err });
  }
}

//위에 정의한 제너레이터 함수로부터  이터러블객체를 반환받고
//복수개의 이터러블 객체를 인수로 전달해 비동기적으로 동시에 호출한 뒤,
//결과값을 내보내는 함수 추후 리듀서에 미들웨어 적용후 store에 저장할 때 필요
export default function* rootSaga() {
  yield all([fork(callFlickr)]);
}