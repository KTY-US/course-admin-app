import React from 'react';
import { Navigate } from 'react-router-dom';

import { getUserInformationFromStorage } from '../../helpers/localStorage';

const AuthRoute = ({ children }) => {
	const user = getUserInformationFromStorage();
	return user?.userId ? (
		<Navigate
			to={{
				pathname: '/',
				query: '?src=non'
			}}
		/>
	) : (
		children
	);
};

export default AuthRoute;
