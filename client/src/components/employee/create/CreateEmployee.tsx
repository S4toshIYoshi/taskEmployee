import {Dispatch, FC, SetStateAction} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {TEmpolyee} from '../../../types/employee/employee.type';
import CenterBlock from '../../UI/centerBlock/CenterBlock';
import style from './style.module.css';
import Input from '../../UI/input/Input';
import Button from '../../UI/button/Button';
import {
	useCreateMutation,
	useGetAllQuery
} from '../../../app/services/employees';

const CreateEmployee: FC<{
	actionClose: Dispatch<SetStateAction<boolean>>;
}> = ({actionClose}) => {
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset
	} = useForm<TEmpolyee>({
		mode: 'onChange'
	});

	const {refetch} = useGetAllQuery();

	const [createEmployee] = useCreateMutation();

	const handler: SubmitHandler<TEmpolyee> = async (data: TEmpolyee) => {
		try {
			await createEmployee(data).unwrap();
			refetch();
			actionClose(false);
		} catch (error) {
			console.log(error);
		}

		reset();
	};

	return (
		<div className={style.main}>
			(
			<CenterBlock>
				<form className={style.form} onSubmit={handleSubmit(handler)}>
					<div className={style.formItem}>
						<Input
							{...register('firstName', {
								required: 'Имя обязательное поле'
							})}
							placeholder='Имя'
							variant='max'
							error={errors?.firstName?.message}
						/>
						<Input
							{...register('lastName', {
								required: 'Фамилия обязательное поле'
							})}
							placeholder='Фамилия'
							variant='max'
							error={errors?.lastName?.message}
						/>
					</div>

					<div className={style.formItem}>
						<Input
							{...register('group', {
								required: 'Группа обязательное поле'
							})}
							placeholder='Группа'
							variant='max'
							error={errors?.group?.message}
						/>

						<Input
							{...register('course', {
								required: 'Курс обязательное поле',
								pattern: {
									value: /[1-4]/,
									message: 'Макимально 4 курса'
								}
							})}
							placeholder='Курс'
							variant='max'
							error={errors?.course?.message}
						/>
						<Input
							{...register('age', {
								required: 'Возраст обязательное поле'
							})}
							placeholder='Возраст'
							variant='max'
							error={errors?.age?.message}
						/>
					</div>

					<Button variant='primary'>Добавить</Button>
				</form>
			</CenterBlock>
			);
			<div className={style.backdrop} onClick={() => actionClose(false)}></div>
		</div>
	);
};

export default CreateEmployee;
