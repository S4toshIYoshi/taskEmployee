import { FC } from 'react';
import { useCurrentQuery } from '../../app/services/auth';
import { useParams, useNavigate } from 'react-router-dom';

const Auth: FC<{ children: JSX.Element }> = ({ children }) => {
	const { isLoading } = useCurrentQuery();

	if (isLoading) {
		return <span>loading...</span>;
	}

	return children;
};

export default Auth;
