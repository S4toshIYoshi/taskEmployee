import { useState } from 'react';
import CenterBlock from '../../components/UI/centerBlock/CenterBlock';
import Layout from '../../components/layout/Layout';
import style from './Login.module.css';
import Input from '../../components/UI/input/Input';
import Button from '../../components/UI/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ILogin } from '../../types/validateForm/login.interface';
import { useLoginMutation } from '../../app/services/auth';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import ErrorMessage from '../../components/error-message/ErrorMessage';

const LoginPage = () => {
	const navigate = useNavigate();

	if (localStorage.getItem('token')) {
		navigate('/');
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ILogin>({
		mode: 'onChange',
	});

	const [loginUser, loginUserResult] = useLoginMutation();
	const [error, setError] = useState('');

	const handler: SubmitHandler<ILogin> = async (data: ILogin) => {
		console.log(data);
		try {
			await loginUser(data).unwrap();
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
					<div className={style.inputs}>
						<Input
							{...register('email', {
								required: 'Почта обязательное поле',
								pattern: {
									value:
										/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
									message: 'Не правильная почта',
								},
							})}
							type='text'
							placeholder='Почта'
							variant='max'
							error={errors?.email?.message}
						/>

						<Input
							{...register('password', {
								required: 'Пароль обязательное поле',
							})}
							placeholder='Пароль'
							type='password'
							variant='max'
							error={errors?.password?.message}
						/>
					</div>

					<div className={style.buttonsBox}>
						<Button variant='primary'>Войти</Button>
						<Link to={'/forgot'}>
							<Button>Забыл пароль?</Button>
						</Link>
					</div>
				</form>
				<ErrorMessage message={error} />
			</CenterBlock>
		</Layout>
	);
};

export default LoginPage;
