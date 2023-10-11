import {FC, useState, Dispatch, SetStateAction, useContext} from 'react';
import {TEmpolyee} from '../../types/employee/employee.type';
import style from './style.module.css';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai';
import {BiCheckbox, BiCheckboxSquare} from 'react-icons/bi';
import clsx from 'clsx';
import {useGetAllQuery, useRemoveMutation} from '../../app/services/employees';
import UpdateEmployee from './update/UpdateEmployee';

const CardEmployee: FC<{
	data: TEmpolyee;
}> = ({data}) => {
	const {firstName, lastName, age, group, course} = data;

	const [isCheckBox, setIsCheckBox] = useState(true);

	const [isPopupUpdate, setIsPopupUpdate] = useState<boolean>(false);

	const [removeEmployee] = useRemoveMutation();

	const {refetch} = useGetAllQuery();

	function handlerCheckBox() {
		setIsCheckBox(prev => !prev);
	}

	return (
		<>
			<div className={clsx(style.main, !isCheckBox ? style.select : '')}>
				<div className={style.inform}>
					{isCheckBox ? (
						<BiCheckbox
							size={30}
							onClick={handlerCheckBox}
							className={style.checkBox}
						/>
					) : (
						<BiCheckboxSquare
							size={30}
							onClick={handlerCheckBox}
							className={style.checkBox}
						/>
					)}

					<div className={style.name}>
						<span>{firstName}</span>
						<span> {lastName}</span>
					</div>
					<div className={style.age}>Возраст: {age}</div>
					<div className={style.group}>Группа: {group}</div>
					<div className={style.course}>Курс: {course}</div>
				</div>

				<div className={style.buttons}>
					<AiOutlineDelete
						className={style.checkBox}
						onClick={() => {
							removeEmployee(data.id);
							refetch();
						}}
					/>
					<AiOutlineEdit
						className={style.checkBox}
						onClick={() => setIsPopupUpdate(prev => !prev)}
					/>
				</div>
			</div>
			{isPopupUpdate && (
				<UpdateEmployee actionClose={setIsPopupUpdate} data={data} />
			)}
		</>
	);
};

export default CardEmployee;
