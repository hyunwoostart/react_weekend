import { useQuery } from '@tanstack/react-query';

const fetchMembers = async () => {
	const data = await fetch(`${process.env.PUBLIC_URL}/DB/department.json`);
	const json = await data.json();
	return json.members;
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
