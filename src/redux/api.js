//컴포넌트 안쪽에 있는 fetching함수에서 react, DOM API기능을 제외한 순수자바스크립트로 동작하는 순수함수 형태로 변환한 뒤 내보냄
export const fetchFlickr = async (opt) => {
    const baseURL =
      'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
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