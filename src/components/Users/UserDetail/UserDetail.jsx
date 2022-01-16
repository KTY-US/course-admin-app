import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import AccountProfile from './AccountProfile';
import AccountProfileDetails from './AccountProfileDetails';

const UserDetail = () => {
	const navigate = useNavigate();
	const { id: userId } = useParams();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					py: 4
				}}
			>
				<Container maxWidth='lg'>
					<Button
						sx={{ textTransform: 'none', display: 'flex', alignItems: 'center' }}
						onClick={handleGoBack}
					>
						<KeyboardBackspaceIcon fontSize='small' /> Go back
					</Button>
					<Typography sx={{ mb: 3, mt: 1 }} variant='h4'>
						Account
					</Typography>
					<Grid container spacing={3}>
						<Grid item lg={4} md={6} xs={12}>
							<AccountProfile />
						</Grid>
						<Grid item lg={8} md={6} xs={12}>
							<AccountProfileDetails />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default UserDetail;
