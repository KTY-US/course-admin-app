import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

import { createCourse } from '../../actions/course';
import { getUserInformationFromStorage } from '../../helpers/localStorage';

const MAX_LENGTH = 255;
const MAX_IMAGE = 6;
const VALID_YEAR = new Date().getFullYear();

const validateForm = async (form) => {
	let errors = { courseNameErr: '', courseCodeErr: '', schoolYearErr: '' };

	if (form.courseName.trim().length === 0) {
		errors.courseNameErr = 'Course name is required!';
	}

	if (form.courseName.length >= MAX_LENGTH && form.courseName.trim().length !== 0) {
		errors.courseNameErr = `Course name must not be greater than ${MAX_LENGTH} characters!`;
	}

	if (form.schoolYear < VALID_YEAR || form.schoolYear > VALID_YEAR + 1) {
		errors.schoolYearErr = `School year must be ${VALID_YEAR} or ${VALID_YEAR + 1}!`;
	}

	return errors;
};

const CreateCourseForm = ({ open, setOpen }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = getUserInformationFromStorage();
	const [errors, setErrors] = useState({ courseNameErr: '', courseCodeErr: '', schoolYearErr: '' });
	const courseNameRef = useRef();
	const courseCodeRef = useRef();
	const schoolYearRef = useRef();

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = {
			courseName: courseNameRef.current.value,
			courseCode: courseCodeRef.current.value,
			schoolYear: schoolYearRef.current.value,
			imagePath: '',
			ownerId: ''
		};
		let errors = await validateForm(form);
		if (errors.courseNameErr !== '' || errors.courseCodeErr !== '' || errors.schoolYearErr !== '') {
			setErrors(errors);
		} else {
			const image = Math.floor(Math.random() * MAX_IMAGE + 1);
			form.imagePath = `/${image}.jpg`;
			form.ownerId = user.userId;
			dispatch(createCourse(form, navigate));
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>CREATE NEW COURSE</DialogTitle>
				<DialogContent>
					<TextField
						error={errors.courseNameErr?.length > 0}
						autoFocus
						margin='normal'
						id='courseName'
						label='Course name *'
						type='text'
						fullWidth
						variant='outlined'
						multiline={true}
						inputRef={courseNameRef}
					/>
					{errors.courseNameErr !== '' && (
						<Typography variant='caption' color='red'>
							{errors.courseNameErr}
						</Typography>
					)}
					<TextField
						error={errors.courseCodeErr?.length > 0}
						margin='normal'
						id='courseCode'
						label='Course code'
						type='text'
						fullWidth
						variant='outlined'
						inputRef={courseCodeRef}
					/>
					{errors.courseCodeErr !== '' && (
						<Typography variant='caption' color='red'>
							{errors.courseCodeErr}
						</Typography>
					)}
					<TextField
						error={errors.schoolYearErr?.length > 0}
						margin='normal'
						id='schoolYear'
						label='School year *'
						type='number'
						fullWidth
						variant='outlined'
						inputRef={schoolYearRef}
					/>
					{errors.schoolYearErr !== '' && (
						<Typography variant='caption' color='red'>
							{errors.schoolYearErr}
						</Typography>
					)}
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

export default CreateCourseForm;
