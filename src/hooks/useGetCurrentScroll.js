export function useGetCurrentScroll(el) {
	return (refEl) => {
		const scroll = el?.scrollTop;
		const baseLine = window.innerHeight / 2;
		let customScroll = 0;

		if (scroll >= refEl.current?.offsetTop - baseLine) {
			customScroll = scroll - refEl.current?.offsetTop;
		} else {
			customScroll = -baseLine;
		}
		return customScroll;
	};
}