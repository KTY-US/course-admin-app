import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Error from '../Error/Error';
import Home from '../Home/Home';
import Account from '../Account/Account';
import Login from '../Auth/login';
import Courses from '../Courses/Courses';
import DashboardLayoutRoot from '../Dashboard/dashboard-layout';

const theme = createTheme();
const App = () => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<DashboardLayoutRoot>
					<Container>
						<Routes>
							<Route path='/' element={<Navigate to='/home' />} />
							<Route path='/home' element={<Home />} />
							<Route path='/courses' element={<Courses />} />
							<Route path='/auth/signin' element={<Login />} />
							<Route path='/user' element={<Account />} />
							<Route path='/not-found' element={<Error content={'404 Page not found'} />} />
							<Route path='*' element={<Error content={'404 Page not found'} />}></Route>
						</Routes>
					</Container>
					<ToastContainer autoClose={5000} />
				</DashboardLayoutRoot>
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
