import './Department.scss';
import Layout from '../../common/layout/Layout';
import React from 'react';
import { useMembersQuery } from '../../../hooks/useMembersQuery';
import { useHistoryQuery } from '../../../hooks/useHistoryQuery';

const path = process.env.PUBLIC_URL;

export default function Department() {
	const {
		isLoading: memberLoading,
		isError: memberErr,
		isSuccess: memberSuccess,
		data: member,
	} = useMembersQuery();

	const { isSuccess: historySuccess, data: history } = useHistoryQuery();

	return (
		<Layout title={'Department'}>
			<section id='historyBox'>
				<h2>History</h2>
				<div className='con'>
					{historySuccess &&
						history.map((data, idx) => {
							return (
								<React.Fragment key={idx}>
									<h3>{Object.keys(data)[0]}</h3>
									<ul>
										{Object.values(data)[0].map((val, idx) => (
											<li key={idx}>{val}</li>
										))}
									</ul>
								</React.Fragment>
							);
						})}
				</div>
			</section>

			<section id='memberBox'>
				<h2>Department</h2>

				<div className='con'>
					{memberLoading && <p>Loading...</p>}
					{memberSuccess &&
						member.map((member, idx) => {
							return (
								<article key={idx}>
									<div className='pic'>
										<img src={`${path}/img/${member.pic}`} alt={member.name} />
									</div>
									<h3>{member.name}</h3>
									<p>{member.position}</p>
								</article>
							);
						})}

					{memberErr && <p>Fail to load Data</p>}
				</div>
			</section>
		</Layout>
	);
}
