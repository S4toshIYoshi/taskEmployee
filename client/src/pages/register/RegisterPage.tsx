import {useState, useEffect} from 'react';
import Input from '../../components/UI/input/Input';
import Layout from '../../components/layout/Layout';
import CenterBlock from '../../components/UI/centerBlock/CenterBlock';
import Button from '../../components/UI/button/Button';
import style from './Register.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {useForm, SubmitHandler} from 'react-hook-form';
import {IRegister} from '../../types/validateForm/register.interface';
import clsx from 'clsx';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import {isErrorWithMessage} from '../../utils/is-error-with-message';
import {useRegisterMutation} from '../../app/services/auth';
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/auth/authSlice';

const RegisterPage = () => {
	const navigate = useNavigate();
	const user = useSelector(selectUser);

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [navigate, user]);

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset
	} = useForm<IRegister>({
		mode: 'onChange'
	});
	const [registerMutation, registerMutationRsult] = useRegisterMutation();
	const [error, setError] = useState('');

	const handler: SubmitHandler<IRegister> = async (data: IRegister) => {
		console.log(data);
		try {
			await registerMutation(data).unwrap();
			navigate('/');
		} catch (error) {
			const maybeError = isErrorWithMessage(error);

			if (maybeError) {
				setError(error.data.message);
				console.log(error.data.message);
			} else {
				setError('Неизвестная ошибка');
			}
		}

		reset();
	};

	return (
		<Layout>
			<CenterBlock>
				<form className={style.form} onSubmit={handleSubmit(handler)}>
					<div className={clsx(style.formItem)}>
						<Input
							{...register('email', {
								required: 'Почта обязательное поле',
								pattern: {
									value:
										/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
									message: 'Не правильная почта'
								}
							})}
							type='text'
							placeholder='Почта'
							variant='max'
							error={errors?.email?.message}
						/>

						<Input
							{...register('password', {
								required: 'Пароль обязательное поле',
								pattern: {
									value:
										/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/,
									message:
										'Пароль должен содержать минимум 6 сиволов, спец символ, буквы A-z'
								}
							})}
							placeholder='Пароль'
							type='password'
							variant='max'
							error={errors?.password?.message}
						/>
					</div>

					<div className={style.formItem}>
						<Input
							{...register('FirstName', {
								required: 'Имя обязательное поле'
							})}
							placeholder='Имя'
							variant='max'
							error={errors?.FirstName?.message}
						/>
						<Input
							{...register('LastName', {
								required: 'Фамилия обязательное поле'
							})}
							placeholder='Фамилия'
							variant='max'
							error={errors?.LastName?.message}
						/>
					</div>

					<div className={style.formItem}>
						<Input
							{...register('nickName', {
								required: 'Никнейм обязательное поле'
							})}
							placeholder='Никнейм'
							variant='max'
							error={errors?.nickName?.message}
						/>
						<Input
							{...register('group', {
								required: 'Группа обязательное поле'
							})}
							placeholder='Группа'
							variant='max'
							error={errors?.group?.message}
						/>
					</div>

					<div className={style.buttonsBox}>
						<Button variant='primary'>Зарегестрироватсья</Button>
						<Link to={'/login'}>
							<Button>Войти</Button>
						</Link>
					</div>
				</form>
				<ErrorMessage message={error} />
			</CenterBlock>
		</Layout>
	);
};

export default RegisterPage;
