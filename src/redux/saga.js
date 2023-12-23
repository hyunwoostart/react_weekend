import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr, fetchYoutube, fetchDepartment, fetchHistory } from './api';
import * as types from './actionType';

function* callFlickr() {
	yield takeLatest(types.FLICKR.start, function* (action) {
		try {
			const response = yield call(fetchFlickr, action.Opt);
			yield put({
				type: types.FLICKR.success,
				payload: response.photos.photo
			});
		} catch (err) {
			yield put({ type: types.FLICKR.fail, payload: err });
		}
	});
}

function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, function* () {
		try {
			const response = yield call(fetchYoutube);
			yield put({
				type: types.YOUTUBE.success,
				payload: response.items
			});
		} catch (err) {
			yield put({ type: types.YOUTUBE.fail, payload: err });
		}
	});
}

function* callDepartment() {
	yield takeLatest(types.DEPARTMENT.start, function* () {
		try {
			const response = yield call(fetchDepartment);
			yield put({
				type: types.DEPARTMENT.success,
				payload: response.members
			});
		} catch (err) {
			yield put({ type: types.DEPARTMENT.fail, payload: err });
		}
	});
}

function* callHistory() {
	yield takeLatest(types.HISTORY.start, function* () {
		try {
			const response = yield call(fetchHistory);
			yield put({
				type: types.HISTORY.success,
				payload: response.history
			});
		} catch (err) {
			yield put({ type: types.HISTORY.fail, payload: err });
		}
	});
}

export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callYoutube), fork(callDepartment), fork(callHistory)]);
}
