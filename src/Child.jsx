import { memo } from 'react';

function Child() {
	console.log('child');
	return (
		<div>
			<h2>Child</h2>
		</div>
	);
}

export default memo(Child);

//hoc (high order component): 고차컴포넌트
//인수롤 컴포넌트를 전달받아서 새로운 컴포넌트를 리턴하는 컴포넌트
