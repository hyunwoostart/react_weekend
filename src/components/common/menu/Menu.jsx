import './Menu.scss';

export default function Menu({ IsMenu, setIsMenu }) {
	return (
		IsMenu && (
			<aside className='Menu' onClick={() => setIsMenu(false)}>
				Menu
			</aside>
		)
	);
}