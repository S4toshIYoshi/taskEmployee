import clsx from 'clsx';
import { FC, ReactNode } from 'react';

const Description: FC<{
	children: ReactNode;
	theme?: 'dark' | 'light';
	primary?: boolean;
	className?: string;
}> = ({ children, theme = 'dark', primary = false, className = '' }) => {
	const style = {
		fontSize: '15px',
		fontFamily: "'Montserrat', sans-serif",
		color: primary ? '#eb4f8b' : theme === 'dark' ? '#ffffff8f' : '#2b2828f1',
	};

	return (
		<p style={style} className={clsx(className)}>
			{children}
		</p>
	);
};

export default Description;
