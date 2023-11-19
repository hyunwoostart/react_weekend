export function useGetCurrentScroll() {
	return (refEl) => {
		const scroll = window.scrollY;
		return scroll - refEl.current?.offsetTop;
	};
}
