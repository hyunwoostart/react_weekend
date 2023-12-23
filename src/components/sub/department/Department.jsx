import './Department.scss';
import React from 'react';
import Layout from '../../common/layout/Layout';
import { useSelector } from 'react-redux';

export default function Department() {
	const path = process.env.PUBLIC_URL;
	const Department = useSelector(store => store.departmentReducer.department);
	const History = useSelector(store => store.historyReducer.history);

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
					{Department.map((member, idx) => {
						return (
							<article key={idx}>
								<div className='pic'>
									<img
										src={`${path}/img/${member.pic}`}
										alt={member.name}
									/>
								</div>
								<h3>{member.name}</h3>
								<p>{member.position}</p>
							</article>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}
