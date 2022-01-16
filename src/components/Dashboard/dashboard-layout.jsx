import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import jwt_decode from 'jwt-decode';

import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { getUserInformationFromStorage } from '../../helpers/localStorage';
import { authActions } from '../../reducers/auth';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
	display: 'flex',
	flex: '1 1 auto',
	maxWidth: '100%',
	paddingTop: 64,
	[theme.breakpoints.up('lg')]: {
		paddingLeft: 220
	}
}));

export const DashboardLayout = (props) => {
	const { children } = props;
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [user, setUser] = useState(getUserInformationFromStorage());
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		setUser(getUserInformationFromStorage());
		const token = user?.token;

		if (token) {
			const decodedToken = jwt_decode(token);
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				logout();
				window.location.reload();
			}
		}
	}, [location]);

	const logout = () => {
		dispatch(authActions.freeUser());
		setUser(null);
		window.location.replace('/');
	};

	return (
		<>
			{user ? (
				<>
					<DashboardLayoutRoot>
						<Box
							sx={{
								display: 'flex',
								flex: '1 1 auto',
								flexDirection: 'column',
								width: '100%'
							}}
						>
							{children}
						</Box>
					</DashboardLayoutRoot>
					<DashboardNavbar user={user} logout={logout} onSidebarOpen={() => setSidebarOpen(true)} />
					<DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
				</>
			) : (
				<>{children}</>
			)}
		</>
	);
};

export default DashboardLayout;
