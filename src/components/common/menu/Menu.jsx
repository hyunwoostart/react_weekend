import './Menu.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import client from '../../../redux/clientActionType';

export default function Menu() {
	const dispatch = useDispatch();
	const IsMenu = useSelector(store => store.menuReducer.menu);

	useEffect(() => {
		const removeMenu = () => {
			window.innerWidth >= 640 && dispatch({ type: client.menu, payload: false });
		};
		IsMenu ? window.addEventListener('resize', removeMenu) : window.removeEventListener('resize', removeMenu);
	}, [IsMenu, dispatch]);

	return (
		<AnimatePresence>
			{IsMenu && (
				<motion.aside
					className='Menu'
					onClick={() => dispatch({ type: client.menu, payload: false })}
					initial={{ opacity: 0, x: '-100%' }}
					animate={{ opacity: 1, x: '0%' }}
					exit={{ opacity: 0, x: '-100%' }}
					transition={{ duration: 0.5 }}>
					<h1>
						<Link to='/'>DCODELAB</Link>
					</h1>

					<ul>
						<li>
							<NavLink
								to='/department'
								activeClassName={'on'}>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/community'
								activeClassName={'on'}>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/gallery'
								activeClassName={'on'}>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/youtube'
								activeClassName={'on'}>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/members'
								activeClassName={'on'}>
								Members
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/contact'
								activeClassName={'on'}>
								Contact
							</NavLink>
						</li>
					</ul>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
