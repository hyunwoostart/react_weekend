import './Menu.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';

export default function Menu({ IsMenu, setIsMenu }) {
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