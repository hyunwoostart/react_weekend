export const fetchFlickr = async opt => {
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
	return json;
};

export const fetchYoutube = async () => {
	const api_key = process.env.REACT_APP_YOUTUBE_KEY;
	const pid = process.env.REACT_APP_PLAYLIST;
	const num = 10;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
	const data = await fetch(baseURL);
	const json = await data.json();
	return json;
};
