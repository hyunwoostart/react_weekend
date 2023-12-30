import './Department.scss';
import Layout from '../../common/layout/Layout';
import React, { useEffect, useState } from 'react';
import { useMembersQuery } from '../../../hooks/useMembersQuery';

const path = process.env.PUBLIC_URL;

export default function Department() {
	const [History, setHistory] = useState([]);
	const { isSuccess, data: Department } = useMembersQuery();

	const fetchHistory = async () => {
		const data = await fetch(`${path}/DB/history.json`);
		const json = await data.json();

		setHistory(json.history);
	};

	useEffect(() => {
		fetchHistory();
	}, []);

	return (
		<Layout title={'Department'}>
			<section id='historyBox'>
				<h2>History</h2>
				<div className='con'>
					{History.map((data, idx) => {
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
					{isSuccess ? (
						Department.map((member, idx) => {
							return (
								<article key={idx}>
									<div className='pic'>
										<img src={`${path}/img/${member.pic}`} alt={member.name} />
									</div>
									<h3>{member.name}</h3>
									<p>{member.position}</p>
								</article>
							);
						})
					) : (
						<p>Loading...</p>
					)}
				</div>
			</section>
		</Layout>
	);
}
