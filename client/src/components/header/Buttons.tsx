import {FC} from 'react';
import {Link} from 'react-router-dom';
import Description from '../UI/description/Description';
import {GoPersonAdd} from 'react-icons/go';
import {AiOutlineLogin} from 'react-icons/ai';
import style from './Header.module.css';
import clsx from 'clsx';
import {useCurrentQuery} from '../../app/services/auth';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser, logout} from '../../features/auth/authSlice';

const Buttons: FC<{logout: boolean}> = ({logout}) => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	function clearStorage() {
		dispatch(logout());
		localStorage.removeItem('token');
	}

	if (logout) {
		return (
			<div className={style.buttonsBox}>
				<Description primary={true} className={style.userNick}>
					{user?.nickName}
				</Description>

				<Link
					to={'/login'}
					className={clsx(style.link, style.login)}
					onClick={clearStorage}>
					<Description>
						<AiOutlineLogin />
					</Description>
					<Description>Выйти</Description>
				</Link>
			</div>
		);
	}

	return (
		<div className={style.buttonsBox}>
			<Link to={'/register'} className={clsx(style.link, style.register)}>
				<Description primary={true}>
					<GoPersonAdd />
				</Description>
				<Description primary={true}>Регистрация</Description>
			</Link>
			<Link to={'/login'} className={clsx(style.link, style.login)}>
				<Description>
					<AiOutlineLogin />
				</Description>
				<Description>Войти</Description>
			</Link>
		</div>
	);
};

export default Buttons;
