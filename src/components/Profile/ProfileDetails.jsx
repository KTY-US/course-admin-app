import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { updateProfile } from '../../actions/admin';
import { checkUserCode } from '../../apis/admin';
import { getUserInformationFromStorage } from '../../helpers/localStorage';
import DraggableDialog from './DraggableDialog';
import useStyles from './styles';

const initError = {
	firstNameError: '',
	lastNameError: '',
	userCodeError: '',
	nothingChanged: 'No field changed!!'
};
const maxErrorCount = Object.keys(initError).length;

const validateForm = (formData, initialValues, userCodeOldError) => {
	let errors = {
		firstNameError: '',
		lastNameError: '',
		userCodeError: userCodeOldError
	};

	if (formData.firstName === '') {
		errors.firstNameError = 'First name is required!';
	}

	if (formData.lastName === '') {
		errors.lastNameError = 'Last name is required!';
	}

	if (Object.keys(formData).every((key) => initialValues[key] === formData[key])) {
		errors.nothingChanged = 'No field changed!';
	} else {
		errors.nothingChanged = '';
	}

	return errors;
};
export const ProfileDetails = (props) => {
	const initialValues = useSelector((state) => state.auth.userInfo);
	const [values, setValues] = useState(initialValues);
	const [errorEditProfile, setErrorEditProfile] = useState(initError);
	const [editable, setEditable] = useState(false);
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userId } = getUserInformationFromStorage();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleCheckUserCode = async (event) => {
		event.preventDefault();
		const code = values.userCode;
		if (code !== '') {
			try {
				await checkUserCode({ userCode: code, userId: userId });
				setErrorEditProfile({ ...errorEditProfile, userCodeError: '' });
			} catch ({ response }) {
				setErrorEditProfile({ ...errorEditProfile, userCodeError: response?.data.message });
			}
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCloseByClick = (event) => {
		event.preventDefault;
		setOpen(false);

		const value = event.target.value;
		if (value === 'agree') {
			const result = handleSubmit(event);
			if (result === true) {
				setEditable(!editable);
				setErrorEditProfile(initError);
			}
		} else {
			setValues(initialValues);
			setErrorEditProfile(initError);
			setEditable(!editable);
		}
	};

	const handleSaveButtonClick = (event) => {
		event.preventDefault;
		setOpen(true);
	};

	const handleEditButtonClick = (event) => {
		event.preventDefault;
		setEditable(!editable);
	};

	const handleSubmit = (event) => {
		event.preventDefault;

		const formData = {
			firstName: values.firstName,
			lastName: values.lastName,
			userCode: values.userCode
		};
		let errors = validateForm(formData, initialValues, errorEditProfile.userCodeError);
		setErrorEditProfile({ ...errorEditProfile, ...errors });
		if (errors.nothingChanged !== '') {
			toast.warning('Nothing Changed!!!');

			return false;
		}
		const notErrorCount = Object.keys(errors).filter((key) => errors[key] === '').length;
		if (notErrorCount === maxErrorCount) {
			formData.userId = userId;
			dispatch(updateProfile(formData, navigate, setErrorEditProfile));
			return true;
		} else {
			return false;
		}
	};

	return (
		<form autoComplete='off' onSubmit={handleSubmit} noValidate {...props}>
			<Card>
				<CardHeader subheader='The information can be edited' title='Profile' />
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							<TextField
								disabled={!editable}
								fullWidth
								label='First name'
								name='firstName'
								required
								onChange={handleChange}
								value={values.firstName}
								error={errorEditProfile.firstNameError.length > 0}
								helperText={errorEditProfile.firstNameError}
								variant='outlined'
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								disabled={!editable}
								fullWidth
								label='Last name'
								name='lastName'
								required
								onChange={handleChange}
								value={values.lastName}
								error={errorEditProfile.lastNameError.length > 0}
								helperText={errorEditProfile.lastNameError}
								variant='outlined'
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								disabled={!editable}
								fullWidth
								label='Code'
								name='userCode'
								onBlur={handleCheckUserCode}
								onChange={handleChange}
								value={values.userCode}
								error={errorEditProfile.userCodeError.length > 0}
								helperText={errorEditProfile.userCodeError}
								variant='outlined'
							/>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						p: 2
					}}
				>
					{editable ? (
						<div className={classes.buttonBox}>
							<Button
								type='cancel'
								value='cancel'
								onClick={handleCloseByClick}
								color='error'
								variant='contained'
							>
								Cancel
							</Button>
							<Button
								value='save'
								onClick={handleSaveButtonClick}
								color='primary'
								variant='contained'
								autoFocus
							>
								Save details
							</Button>
						</div>
					) : (
						<Button onClick={handleEditButtonClick} color='primary' variant='contained'>
							Edit Profile
						</Button>
					)}
				</Box>
				<DraggableDialog open={open} handleClose={handleClose} handleCloseByClick={handleCloseByClick} />
			</Card>
		</form>
	);
};
