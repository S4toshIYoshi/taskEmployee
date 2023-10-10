import { FC } from 'react';

const ErrorMessage: FC<{ message?: string }> = ({ message }) => {
	if (!message) {
		return null;
	}

	return <div style={{ color: 'red' }}>{message}</div>;
};

export default ErrorMessage;
