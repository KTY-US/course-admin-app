import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const MAX_LENGTH = 255;
const MIN_LENGTH = 8;

const validateForm = async (form) => {
	let errors = { adminUsernameErr: '' };

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
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errors, setErrors] = useState({ adminUsernameErr: '' });
	const adminUsernameRef = useRef();

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = {
			username: adminUsernameRef.current.value
		};
		let errors = await validateForm(form);
		if (errors.adminUsernameErr !== '') {
			setErrors(errors);
		} else {
			console.log(form);
			// dispatch(createCourse(form, navigate));
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
