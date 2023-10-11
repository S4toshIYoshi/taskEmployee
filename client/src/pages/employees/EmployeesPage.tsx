import {useEffect, useState} from 'react';
import Layout from '../../components/layout/Layout';
import style from './style.module.css';
import Button from '../../components/UI/button/Button';
import CardEmployee from '../../components/employee/CardEmployee';
import {useGetAllQuery} from '../../app/services/employees';
import {TEmpolyee} from '../../types/employee/employee.type';
import CreateEmployee from '../../components/employee/create/CreateEmployee';
import {useNavigate} from 'react-router-dom';
import Description from '../../components/UI/description/Description';
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/auth/authSlice';

const Employees = () => {
	const [isPopupCreate, setIsPopupCreate] = useState<boolean>(false);

	const navigate = useNavigate();

	const user = useSelector(selectUser);

	const {data, isLoading} = useGetAllQuery();

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [navigate, user]);

	if (isLoading) {
		return (
			<Layout>
				<div>Loading...</div>
			</Layout>
		);
	}

	return (
		<>
			<Layout>
				<div className={style.wrapper}>
					<div className={style.buttons}>
						<Button
							variant='primary'
							onClick={() => setIsPopupCreate(prev => !prev)}>
							Добавить
						</Button>
					</div>

					<div className={style.content}>
						{!!data?.length ? (
							<>
								{data?.map((el: TEmpolyee) => (
									<CardEmployee key={el.id} data={el} />
								))}
							</>
						) : (
							<Description className={style.description}>
								Нет абитуриентов
							</Description>
						)}
					</div>
				</div>
			</Layout>
			{isPopupCreate && <CreateEmployee actionClose={setIsPopupCreate} />}
		</>
	);
};

export default Employees;
