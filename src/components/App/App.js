import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Error from '../Error/Error';
import Home from '../Home/Home';
import AccountProfile from '../Account/AccountProfile';

const theme = createTheme();
const App = () => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Container maxWidth='xl'>
					<Routes>
						<Route path='/' element={<Navigate to='/home' />} />
						<Route path='/home' element={<Home />} />
						<Route path='/not-found' element={<Error content={'404 Page not found'} />} />
						<Route element={<Error content={'404 Page not found'} />}></Route>

						<Route path='/user/:id' element={<AccountProfile />} />
					</Routes>
				</Container>
				<ToastContainer autoClose={5000} />
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
