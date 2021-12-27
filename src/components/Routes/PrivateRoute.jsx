import React from 'react';
import { Navigate } from 'react-router-dom';

import { getUserInformationFromStorage, saveUrlToStorage } from '../../helpers/localStorage';

const PrivateRoute = ({ children }) => {
	const url = window.location.pathname;
	const user = getUserInformationFromStorage();
	return user?.userId ? (
		children
	) : (
		<>
			{saveUrlToStorage(url)}
			<Navigate
				to={{
					pathname: '/auth/signin',
					query: '?src=non'
				}}
			/>
		</>
	);
};

export default PrivateRoute;
