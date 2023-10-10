import { Link } from 'react-router-dom';

import style from './Header.module.css';
import Title from '../UI/Title/Title';
import Buttons from './Buttons';

const HeaderPage = () => {
	return (
		<header className={style.header}>
			<Link to={'/'}>
				<Title>Абитуриенты</Title>
			</Link>
			<Buttons logout={!!localStorage.getItem('token')} />
		</header>
	);
};

export default HeaderPage;
