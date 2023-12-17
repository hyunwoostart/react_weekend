import './Modal.scss';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';

export default function Modal({ children }) {
	const dispatch = useDispatch();
	const IsOpen = useSelector(store => store.modalReducer.isOpen);

	useEffect(() => {
		document.body.style.overflow = IsOpen ? 'hidden' : 'auto';
	}, [IsOpen]);

	return (
		<AnimatePresence>
			{IsOpen && (
				<motion.aside
					className='modal'
					initial={{ opacity: 0, x: '100%', scale: 0.5 }}
					animate={{ opacity: 1, x: '0%', scale: 1 }}
					exit={{ opacity: 0, x: '-100%', scale: 1.5 }}
					transition={{ duration: 0.5 }}>
					<motion.div
						className='con'
						initial={{ opacity: 0, rotate: 50 }}
						animate={{ opacity: 1, rotate: 0, transition: { delay: 1 } }}
						exit={{ opacity: 0, rotate: 0, scale: 1.5, transition: { delay: 0.5 } }}>
						{children}
					</motion.div>
					<motion.span
						onClick={() => dispatch({ type: 'SET_MODAL', payload: false })}
						initial={{ opacity: 0, x: 200 }}
						animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
						exit={{ opacity: 0, x: 200 }}>
						close
					</motion.span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
