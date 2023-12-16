import { Link } from 'react-router-dom';
import { FaYoutube, FaTwitter } from 'react-icons/fa6';
import './Footer.scss';
import { useSelector } from 'react-redux';

export default function Footer() {
	// 순서4 - 전역 store로부터 데이터 전달 받음
	const MemberData = useSelector(store => store.memberReducer.members);
	console.log(MemberData);

	return (
		<footer>
			<h1>Dcodelab</h1>

			<p>2023 Dcodelab &copy; All Rights Reserved.</p>
			{/* 전역 state값 출력: 주의 첫번째 마운트시에는 빈배열값이므로 옵셔널 체이닝 처리 */}
			<p>This company was founced by {MemberData[0]?.name}</p>

			<ul>
				<li>
					<Link to='/'>
						<FaYoutube size={20} />
					</Link>
				</li>
				<li>
					<Link to='/'>
						<FaTwitter size={20} />
					</Link>
				</li>
			</ul>
		</footer>
	);
}
