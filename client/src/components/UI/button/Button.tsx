import clsx from 'clsx';
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import style from './Button.module.css';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'primary';
	theme?: 'dark' | 'light';
	className?: string;
	active?: boolean;
}

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	theme = 'dark',
	variant = 'default',
	active = true,
	...rest
}) => {
	if (!active) {
		return (
			<button className={clsx(style.main, style.notActive, className)}>
				{children}
			</button>
		);
	}

	if (variant === 'default') {
		return (
			<button
				className={clsx(
					theme === 'dark' ? style.dark : style.light,
					style.main,
					className
				)}
				{...rest}
			>
				{children}
			</button>
		);
	}

	if (variant === 'primary') {
		return (
			<button className={clsx(style.main, style.primary, className)} {...rest}>
				{children}
			</button>
		);
	}
};

export default Button;
