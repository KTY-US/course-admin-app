import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

import { createAdmin } from '../../../actions/admin';
import useStyles from './styles';

const MAX_LENGTH = 255;
const MIN_LENGTH = 8;

const validateForm = async (form) => {
	let errors = { adminUsernameErr: '', firstNameErr: '', lastNameErr: '' };

	if (form.username.trim().length === 0) {
		errors.adminUsernameErr = 'Admin username is required!';
	}

	if (form.username.length >= MAX_LENGTH && form.username.trim().length !== 0) {
		errors.adminUsernameErr = `Admin username must not be greater than ${MAX_LENGTH} characters!`;
	}

	if (form.username.length <= MIN_LENGTH && form.username.trim().length !== 0) {
		errors.adminUsernameErr = `Admin username must not be less than ${MIN_LENGTH} characters!`;
	}

	return errors;
};

const CreateAdminAccForm = ({ open, setOpen }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errors, setErrors] = useState({ adminUsernameErr: '', firstNameErr: '', lastNameErr: '' });
	const adminUsernameRef = useRef();
	const firstNameRef = useRef();
	const lastNameRef = useRef();

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = {
			username: adminUsernameRef.current.value,
			firstName: firstNameRef.current.value,
			lastName: lastNameRef.current.value
		};
		let errors = await validateForm(form);
		if (errors.adminUsernameErr !== '' || errors.firstNameErr !== '' || errors.lastNameErr !== '') {
			setErrors(errors);
		} else {
			dispatch(createAdmin(form, navigate));
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>CREATE ADMIN ACCOUNT</DialogTitle>
				<DialogContent>
					<TextField
						error={errors.adminUsernameErr?.length > 0}
						autoFocus
						margin='normal'
						id='adminUsername'
						label='Admin username *'
						type='text'
						fullWidth
						variant='outlined'
						multiline={true}
						inputRef={adminUsernameRef}
						helperText={errors.adminUsernameErr}
					/>
					<TextField
						error={errors.firstNameErr?.length > 0}
						margin='normal'
						id='firstName'
						label='First name'
						type='text'
						fullWidth
						variant='outlined'
						multiline={true}
						inputRef={firstNameRef}
						helperText={errors.firstNameErr}
					/>
					<TextField
						error={errors.lastNameErr?.length > 0}
						margin='normal'
						id='lastName'
						label='Last name'
						type='text'
						fullWidth
						variant='outlined'
						multiline={true}
						inputRef={lastNameRef}
						helperText={errors.lastNameErr}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='error' variant='contained'>
						Cancel
					</Button>
					<Button color='success' variant='contained' type='submit'>
						Create
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default CreateAdminAccForm;
