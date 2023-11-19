export function useGetCurrentScroll() {
	return (refEl) => {
		const scroll = window.scrollY;
		let customScroll = 0;

		if (scroll >= refEl.current?.offsetTop) {
			customScroll = scroll - refEl.current?.offsetTop;
		} else {
			customScroll = 0;
		}
		return customScroll;
	};
}
