import React from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Error from '../Error/Error';
import Login from '../Auth/login';
import Courses from '../Courses/Courses';
import DashboardLayoutRoot from '../Dashboard/dashboard-layout';
import CourseDetail from '../Courses/Course/CourseDetail';
import Users from '../Users/Users';
import UserDetail from '../Users/UserDetail/UserDetail';
import PrivateRoute from '../Routes/PrivateRoute';
import Admins from '../Admins/Admins';

const theme = createTheme();
const App = () => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<DashboardLayoutRoot>
					<Container>
						<Routes>
							<Route path='/' element={<Navigate to='/courses' />} />
							<Route path='/courses'>
								<Route index element={<PrivateRoute> <Courses /> </PrivateRoute>} />
								<Route path=':courseId' element={<PrivateRoute> <CourseDetail /> </PrivateRoute>} />
							</Route>
							<Route
								path='/admins'
								element={
									<PrivateRoute>
										<Admins />
									</PrivateRoute>
								}
							/>
							<Route
								path='/users'
								element={
									<PrivateRoute>
										<Users />
									</PrivateRoute>
								}
							/>
							<Route
								path='/users/:id'
								element={
									<PrivateRoute>
										<UserDetail />
									</PrivateRoute>
								}
							/>
							<Route path='/auth/signin' element={<Login />} />
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
