import './Department.scss';
import Layout from '../../common/layout/Layout';
import React, { useEffect, useState } from 'react';
import { useMembersQuery } from '../../../hooks/useMembersQuery';

const path = process.env.PUBLIC_URL;

export default function Department() {
	const [Num, setNum] = useState(0);
	const [History, setHistory] = useState([]);

	const { isSuccess, isLoading, isError, data: Department } = useMembersQuery(Num); //커스텀훅 호출시 인수로 데이터에서 뽑아낼 데이터의 순번을 전달

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
			<button onClick={() => setNum(0)}>데이터0 확인</button>
			<button onClick={() => setNum(1)}>데이터1 확인</button>
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

			{/* <section id="memberBox">
        <h2>Department</h2>

        <div className="con">
          {isLoading && <p>Loading...</p>}
          {isSuccess &&
            Department.map((member, idx) => {
              return (
                <article key={idx}>
                  <div className="pic">
                    <img src={`${path}/img/${member.pic}`} alt={member.name} />
                  </div>
                  <h3>{member.name}</h3>
                  <p>{member.position}</p>
                </article>
              );
            })}

          {isError && <p>Fail to load Data</p>}
        </div>
      </section> */}
		</Layout>
	);
}
