import { useQuery } from '@tanstack/react-query';

const fetchMembers = async () => {
	try {
		const data = await fetch(`${process.env.PUBLIC_URL}/DB/history.json`);
		const json = await data.json();
		return json.history;
	} catch (err) {
		throw err;
	}
};

export const useMembersQuery = () => {
	// useQuery('queryKey', fetching func, {query option})
	return useQuery(['fetchMembers'], fetchMembers, {
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		cacheTime: 1000 * 60 * 5,
		staleTime: 0,
	});
};
