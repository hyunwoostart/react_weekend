import { useQuery } from '@tanstack/react-query';

const fetchMembers = async () => {
	try {
		const data = await fetch(`${process.env.PUBLIC_URL}/DB/department.json`);
		const json = await data.json();
		return json.members;
	} catch (err) {
		throw err;
	}
};
export const useMembersQuery = () => {
	return useQuery(['fetchMembers'], fetchMembers, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 10,
		staleTime: 1000 * 10,
	});
};
