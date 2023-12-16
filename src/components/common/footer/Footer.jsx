import { Link } from 'react-router-dom';
import { FaYoutube, FaTwitter } from 'react-icons/fa6';
import './Footer.scss';
import { useSelector } from 'react-redux';

export default function Footer() {
	const MemberData = useSelector(store => store.memberReducer.members);
	console.log(MemberData);

	return (
		<footer>
			<h1>Dcodelab</h1>

			<p>2023 Dcodelab &copy; All Rights Reserved.</p>
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
