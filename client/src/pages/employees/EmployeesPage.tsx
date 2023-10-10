import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import style from './style.module.css';
import Button from '../../components/UI/button/Button';
import CardEmployee from '../../components/employee/CardEmployee';
import { useGetAllQuery } from '../../app/services/employees';
import { TEmpolyee } from '../../types/employee/employee.type';
import CreateEmployee from '../../components/employee/create/CreateEmployee';
import { useNavigate } from 'react-router-dom';

const Employees = () => {
	const navigate = useNavigate();

	if (!localStorage.getItem('token')) {
		navigate('/login');
	}

	const { data, isLoading } = useGetAllQuery();

	const [isPopupCreate, setIsPopupCreate] = useState<boolean>(false);

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
							onClick={() => setIsPopupCreate(prev => !prev)}
						>
							Добавить
						</Button>
					</div>

					<div className={style.content}>
						{data ? (
							<>
								{data?.map((el: TEmpolyee) => (
									<CardEmployee key={el.id} data={el} />
								))}
							</>
						) : (
							<div>Нет абитуриентов</div>
						)}
					</div>
				</div>
			</Layout>
			{isPopupCreate && <CreateEmployee actionClose={setIsPopupCreate} />}
		</>
	);
};

export default Employees;
