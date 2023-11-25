export function useGetCurrentScroll() {
	return (refEl) => {
		const scroll = window.scrollY;
		const baseLine = window.innerHeight / 2;
		let customScroll = 0;

		if (scroll >= refEl.current?.offsetTop - baseLine) {
			customScroll = scroll - refEl.current?.offsetTop + baseLine;
		} else {
			customScroll = 0;
		}
		return customScroll;
	};
}