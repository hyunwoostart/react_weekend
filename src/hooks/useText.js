export function useSplitText() {
	return (ref, interval = 0, delay = 0) => {
		let text = ref.current.innerText;
		let tags = '';
		let count = 0;

		for (let letter of text) {
			tags += `<span style='display:inline-block; transition-delay:${
				interval * count + delay
			}s'>${letter}</span>`;
			count++;
		}
		ref.current.innerHTML = tags;
	};
}

export function useCustomText(type) {
	const toUpperText = (txt) => txt.charAt(0).toUpperCase() + txt.slice(1);

	//hook호출시 인수로 전달된 문자값이 shorten이면 말줄임표 기능 적용하는 함수 리턴
	if (type === 'shorten') {
		return (txt, len) => {
			if (txt.length > len) {
				return txt.slice(0, len) + '...';
			} else {
				return txt;
			}
		};
	}

	//해당 hook호출시 인수로 전달된 문자값이 combined면 구분자를 통해 문자를 분리한뒤 특정 문자 이어붙여주는 함수 리턴
	if ((type = 'combined')) {
		return (txt, spc) => {
			const resultText = txt
				.split(/-|_|\+|\./)
				.map((data) => toUpperText(data))
				.join(spc);
			return resultText;
		};
	}
}
