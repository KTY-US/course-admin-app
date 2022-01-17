import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	InputAdornment,
	IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { getUserInformationFromStorage } from '../../../helpers/localStorage';
import { changePassword } from '../../../actions/auth';

const PASSWORD_RULE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const validateForm = (formData) => {
	let errors = { passwordError: '', newPasswordError: '', confirmNewPasswordError: '' };

	if (formData.password === '') {
		errors.passwordError = 'Password is required!';
	} else if (!formData.password.match(PASSWORD_RULE)) {
		errors.passwordError =
			'Password must have 1 upper case, lower case letter along with a number, a special characters';
	} else if (formData.password.length < 8) {
		errors.passwordError = 'Password must have at least 8 characters';
	}

	if (formData.newPassword === '') {
		errors.newPasswordError = 'New password is required!';
	} else if (!formData.newPassword.match(PASSWORD_RULE)) {
		errors.newPasswordError =
			'New password must have 1 upper case, lower case letter along with a number, a special characters';
	} else if (formData.newPassword.length < 8) {
		errors.newPasswordError = 'New password must have at least 8 characters';
	} else {
		if (!(formData.confirmNewPassword !== '' && formData.confirmNewPassword === formData.newPassword)) {
			errors.confirmNewPasswordError = 'Confirm new password does not match';
		}
	}
	if (formData.confirmNewPassword === '') {
		errors.confirmNewPasswordError = 'Confirm new password is required!';
	}

	return errors;
};

const ChangePasswordForm = ({ open, setOpen }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = getUserInformationFromStorage();
	const [errors, setErrors] = useState({ passwordError: '', newPasswordError: '', confirmNewPasswordError: '' });
	const [showPassword, setShowPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const passwordRef = useRef();
	const newPasswordRef = useRef();
	const confirmNewPasswordRef = useRef();

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = {
			password: passwordRef.current.value,
			newPassword: newPasswordRef.current.value,
			confirmNewPassword: confirmNewPasswordRef.current.value
		};
		let errors = validateForm(form);
		if (errors.newPasswordError !== '' || errors.confirmNewPasswordError !== '' || errors.passwordError !== '') {
			setErrors(errors);
		} else {
			handleClose();
			dispatch(changePassword(form, user.userId, navigate));
		}
	};

	const handleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const handleShowNewPassword = () => {
		setShowNewPassword((prevShowPassword) => !prevShowPassword);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>CHANGE PASSWORD</DialogTitle>
				<DialogContent>
					<TextField
						error={errors.passwordError?.length > 0}
						autoFocus
						margin='normal'
						id='password'
						label='Password *'
						type={showPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton onClick={handleShowPassword}>
										{!showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							)
						}}
						fullWidth
						variant='outlined'
						inputRef={passwordRef}
						helperText={errors.passwordError}
					/>
					<TextField
						error={errors.newPasswordError?.length > 0}
						margin='normal'
						id='newPassword'
						label='New password *'
						type={showNewPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton onClick={handleShowNewPassword}>
										{!showNewPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							)
						}}
						fullWidth
						variant='outlined'
						inputRef={newPasswordRef}
						helperText={errors.newPasswordError}
					/>
					<TextField
						error={errors.confirmNewPasswordError?.length > 0}
						margin='normal'
						id='confirmNewPassword'
						label='Confirm New Password'
						type='password'
						fullWidth
						variant='outlined'
						inputRef={confirmNewPasswordRef}
						helperText={errors.confirmNewPasswordError}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='error' variant='contained'>
						Cancel
					</Button>
					<Button color='success' variant='contained' type='submit'>
						Change
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default ChangePasswordForm;
