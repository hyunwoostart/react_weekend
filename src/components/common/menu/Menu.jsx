import './Menu.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Menu({ IsMenu, setIsMenu }) {
	useEffect(() => {
		const removeMenu = () => {
			window.innerWidth >= 640 && setIsMenu(false);
		};
		//해당 컴포넌트는 IsMenu가 false가 JSX가 리턴되진 않지만 컴포넌트 자체는 계속 마운트되어 있는 상태이기 때문에
		//cleanUp함수로 윈도우객체에 이벤트 핸들러 제거가 불가능하므로 State 값에 따라 핸들러 제거
		IsMenu ? window.addEventListener('resize', removeMenu) : window.removeEventListener('resize', removeMenu);
	}, [IsMenu, setIsMenu]);

	return (
		<AnimatePresence>
			{IsMenu && (
				<motion.aside
					className='Menu'
					onClick={() => setIsMenu(false)}
					initial={{ opacity: 0, x: '-100%' }}
					animate={{ opacity: 1, x: '0%' }}
					exit={{ opacity: 0, x: '-100%' }}
					transition={{ duration: 0.5 }}
				>
					<h1>
						<Link to='/'>DCODELAB</Link>
					</h1>

					<ul>
						<li>
							<NavLink to='/department' activeClassName={'on'}>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeClassName={'on'}>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeClassName={'on'}>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeClassName={'on'}>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/members' activeClassName={'on'}>
								Members
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeClassName={'on'}>
								Contact
							</NavLink>
						</li>
					</ul>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}