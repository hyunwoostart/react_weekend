import './Modal.scss';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import clientAction from '../../../redux/clientActionType';

export default function Modal({ children }) {
	const dispatch = useDispatch();
	const IsOpen = useSelector(store => store.modalReducer.modal);
	useEffect(() => {
		document.body.style.overflow = IsOpen ? 'hidden' : 'auto';
	}, [IsOpen]);

	return (
		<AnimatePresence>
			{IsOpen && (
				<motion.aside
					className='modal'
					initial={{ opacity: 0, x: '100%', scale: 0.5 }} //JSX가 마운트되기 전상태의 스타일
					animate={{ opacity: 1, x: '0%', scale: 1 }} //JSX가 마운트된 후의 스타일
					exit={{ opacity: 0, x: '-100%', scale: 1.5 }} //JSX가 앞으로 언마운트될때의 스타일
					transition={{ duration: 1 }} //스타일이 변경될떄의 전환시간
				>
					<motion.div
						className='con'
						initial={{ opacity: 0, rotate: 50 }}
						animate={{ opacity: 1, rotate: 0, transition: { delay: 1 } }}
						exit={{ opacity: 0, rotate: 0, scale: 1.5, transition: { delay: 1 } }}>
						{children}
					</motion.div>
					<motion.span
						onClick={() => dispatch({ type: clientAction.modal, payload: false })}
						initial={{ opacity: 0, x: 200 }}
						animate={{ opacity: 1, x: 0, transition: { delay: 2 } }}
						exit={{ opacity: 0, x: 200 }}>
						close
					</motion.span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
