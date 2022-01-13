import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

const validateForm = (form) => {
	let errors = { emailError: '', passwordError: '' };

	if (form.email.trim().length === 0) {
		errors.emailError = 'Email is required!';
	}

	if (form.password.trim().length === 0) errors.passwordError = 'Password is required!';
	return errors;
};

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { signInPending, ggSignInPending } = useSelector((state) => state.auth);
	const [errors, setErrors] = useState({ emailError: '', passwordError: '' });
	const [errorCredential, setErrorCredential] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const usernameRef = useRef();
	const passwordRef = useRef();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = {
			username: usernameRef.current.value,
			password: passwordRef.current.value
		};
		//let errors = validateForm(form);
		if (errors.emailError !== '' || errors.passwordError !== '') {
			setErrors(errors);
		} else {
			console.log(form);
			//dispatch(signIn(form, navigate, setErrorCredential));
		}
	};

	const handleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};
	return (
		<>
			<Box
				component='main'
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexGrow: 1,
					minHeight: '100%'
				}}
			>
				<Container maxWidth='sm'>
					<form onSubmit={handleSubmit}>
						<Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
							<Typography color='textPrimary' variant='h4'>
								Sign in
							</Typography>
						</Box>
						<TextField
							fullWidth
							autoFocus
							label='username'
							margin='normal'
							name='username'
							type='text'
							variant='outlined'
							inputRef={usernameRef}
						/>
						<TextField
							fullWidth
							label='Password'
							margin='normal'
							name='password'
							variant='outlined'
							type={showPassword ? 'text' : 'password'}
							inputRef={passwordRef}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton onClick={handleShowPassword}>
											{!showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								)
							}}
						/>
						<Box sx={{ py: 2 }}>
							<Button color='primary' fullWidth size='large' type='submit' variant='contained'>
								Sign In Now
							</Button>
						</Box>
					</form>
				</Container>
			</Box>
		</>
	);
};

export default Login;
