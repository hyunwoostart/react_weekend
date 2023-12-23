import { combineReducers } from 'redux';
import * as types from './actionType';

const flickrReducer = (state = { flickr: [] }, action) => {
	if (action.type === types.FLICKR.start) return state;
	else if (action.type === types.FLICKR.success) return { ...state, flickr: action.payload };
	else if (action.type === types.FLICKR.fail) return { ...state, flickr: action.payload };
	else return state;
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	if (action.type === types.YOUTUBE.start) return state;
	else if (action.type === types.YOUTUBE.success) return { ...state, youtube: action.payload };
	else if (action.type === types.YOUTUBE.fail) return { ...state, youtube: action.payload };
	else return state;
};

const reducers = combineReducers({ flickrReducer, youtubeReducer });
export default reducers;
