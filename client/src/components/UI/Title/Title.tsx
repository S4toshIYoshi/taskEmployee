import { FC, ReactNode } from 'react';

const Title: FC<{ children: ReactNode; theme?: 'dark' | 'light' }> = ({
	children,
	theme = 'dark',
}) => {
	const style = {
		fontFamily: "'Montserrat', sans-serif",
		fontSize: '40px',
		color: theme === 'dark' ? 'white' : 'black',
	};

	return <h1 style={style}>{children}</h1>;
};

export default Title;
