import { FC, InputHTMLAttributes, forwardRef } from 'react';
import { IconType } from 'react-icons';
import { FieldErrors } from 'react-hook-form';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	theme?: 'dark' | 'light';
	variant?: 'mid' | 'max';
	icon?: IconType;
	error?: string | undefined;
}

const Input: FC<IInput> = forwardRef(
	({ theme = 'dark', variant = 'mid', error = '', ...rest }, ref: any) => {
		const style = {
			border: error
				? '1px solid red'
				: theme === 'dark'
				? '1px solid #ffffff8f'
				: '1px solid #2b2828f1',
			color: theme === 'dark' ? '#ffffff8f' : '#2b2828f1',
			borderRadius: '8px',
			padding: '10px',
			width: variant === 'mid' ? '250px' : '100%',
		};

		const styleError = {
			color: 'red',
		};

		return (
			<div>
				<input {...rest} style={style} ref={ref} />
				{!!error.length && <div style={styleError}>{error}</div>}
			</div>
		);
	}
);

export default Input;
