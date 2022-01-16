import React from 'react';
import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';

const AccountProfileDetails = ({ user }) => {
	const [values, setValues] = useState({
		firstName: 'Katarina',
		lastName: 'Smith',
		email: 'demo@devias.io',
		phone: '',
		state: 'Alabama',
		country: 'USA'
	});

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
	};

	return (
		<Card>
			<CardHeader subheader='The information can be edited' title='Profile' />
			<Divider />
			<CardContent>
				<Grid container spacing={3}>
					<Grid item md={6} xs={12}>
						<TextField
							fullWidth
							label='First name'
							name='firstName'
							value={user.firstName}
							variant='outlined'
							disabled
						/>
					</Grid>
					<Grid item md={6} xs={12}>
						<TextField
							fullWidth
							label='Last name'
							name='lastName'
							value={user.lastName}
							variant='outlined'
							disabled
						/>
					</Grid>
					<Grid item md={6} xs={12}>
						<TextField
							fullWidth
							label='Email address'
							name='email'
							value={user.email}
							variant='outlined'
							disabled
						/>
					</Grid>
					<Grid item md={6} xs={12}>
						<TextField
							fullWidth
							label='User code'
							name='userCode'
							value={user.userCode}
							variant='outlined'
							disabled
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
				<Button color='primary' variant='contained'>
					Save details
				</Button>
			</Box>
		</Card>
	);
};

export default AccountProfileDetails;
