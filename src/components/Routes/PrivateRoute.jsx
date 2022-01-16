import React from 'react';
import { Navigate } from 'react-router-dom';

import { getUserInformationFromStorage } from '../../helpers/localStorage';

const PrivateRoute = ({ children }) => {
	const user = getUserInformationFromStorage();
	return user?.userId ? (
		children
	) : (
		<>
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
