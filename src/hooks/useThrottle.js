export function useThrottle() {
	return (txt) => {
		console.log(txt);
		return txt;
	};
}
