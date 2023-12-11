import './Menu.scss';
import { AnimatePresence, motion } from 'framer-motion';

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
					Menu
				</motion.aside>
			)}
		</AnimatePresence>
	);
}