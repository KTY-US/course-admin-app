import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';

const Login = () => {
	const formik = useFormik({
		initialValues: {
			email: 'demo@devias.io',
			password: 'Password123'
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
			password: Yup.string().max(255).required('Password is required')
		}),
		onSubmit: () => {
			//router.push('/');
		}
	});

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
					<form onSubmit={formik.handleSubmit}>
						<Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
							<Typography color='textPrimary' variant='h4'>
								Sign in
							</Typography>
						</Box>
						<Grid container spacing={3}>
							<Grid item xs={12} md={6}></Grid>
							<Grid item xs={12} md={6}></Grid>
						</Grid>

						<TextField
							error={Boolean(formik.touched.email && formik.errors.email)}
							fullWidth
							helperText={formik.touched.email && formik.errors.email}
							label='Email Address'
							margin='normal'
							name='email'
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							type='email'
							value={formik.values.email}
							variant='outlined'
						/>
						<TextField
							error={Boolean(formik.touched.password && formik.errors.password)}
							fullWidth
							helperText={formik.touched.password && formik.errors.password}
							label='Password'
							margin='normal'
							name='password'
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							type='password'
							value={formik.values.password}
							variant='outlined'
						/>
						<Box sx={{ py: 2 }}>
							<Button
								color='primary'
								disabled={formik.isSubmitting}
								fullWidth
								size='large'
								type='submit'
								variant='contained'
							>
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
