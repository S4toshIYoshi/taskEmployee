import { Dispatch, FC, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TEmpolyee } from '../../../types/employee/employee.type';
import CenterBlock from '../../UI/centerBlock/CenterBlock';
import style from './style.module.css';
import Input from '../../UI/input/Input';
import Button from '../../UI/button/Button';
import { useEditMutation } from '../../../app/services/employees';

const UpdateEmployee: FC<{
	actionClose: Dispatch<SetStateAction<boolean>>;
	data: TEmpolyee;
}> = ({ actionClose, data }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TEmpolyee>({
		mode: 'onChange',
	});

	const [updateEmployee] = useEditMutation();

	const handler: SubmitHandler<TEmpolyee> = async (dataHandler: TEmpolyee) => {
		dataHandler.id = data.id;

		try {
			await updateEmployee(dataHandler).unwrap();
		} catch (error) {
			console.log(error);
		}
		actionClose(false);
		reset();
	};

	// setValue('firstName', data.firstName);
	// setValue('lastName', data.lastName);
	// setValue('age', data.age);
	// setValue('course', data.course);
	// setValue('group', data.group);

	return (
		<div className={style.main}>
			(
			<CenterBlock>
				<form className={style.form} onSubmit={handleSubmit(handler)}>
					<div className={style.formItem}>
						<Input
							{...register('firstName', {
								required: 'Имя обязательное поле',
								value: data.firstName,
							})}
							placeholder='Имя'
							variant='max'
							error={errors?.firstName?.message}
						/>
						<Input
							{...register('lastName', {
								required: 'Фамилия обязательное поле',
								value: data.lastName,
							})}
							placeholder='Фамилия'
							variant='max'
							error={errors?.lastName?.message}
						/>
					</div>

					<div className={style.formItem}>
						<Input
							{...register('group', {
								required: 'Группа обязательное поле',
								value: data.group,
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
									message: 'Макимально 4 курса',
								},
								value: data.course,
							})}
							placeholder='Курс'
							variant='max'
							error={errors?.course?.message}
						/>
						<Input
							{...register('age', {
								required: 'Возраст обязательное поле',
								value: data.age,
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

export default UpdateEmployee;
