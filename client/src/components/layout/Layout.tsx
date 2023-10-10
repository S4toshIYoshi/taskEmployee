import { FC, ReactNode } from 'react';
import style from './Layout.module.css';
import Header from '../header/Header';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className={style.main}>
			<Header />
			{children}
		</div>
	);
};

export default Layout;
