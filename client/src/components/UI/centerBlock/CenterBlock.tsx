import { FC, ReactNode } from 'react';
import style from './CenterBlock.module.css';

const CenterBlock: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className={style.main} onClick={e => e.stopPropagation()}>
			{children}
		</div>
	);
};

export default CenterBlock;
