import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button, CircularProgress } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import AccountProfile from './AccountProfile';
import AccountProfileDetails from './AccountProfileDetails';
import { getAdmin } from '../../../apis/admin';
import { getUserInformationFromStorage } from '../../../helpers/localStorage';

const AdminDetail = () => {
	const user = getUserInformationFromStorage();
	const navigate = useNavigate();
	const { id: userId } = useParams();
	const [userData, setUserData] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const handleGoBack = () => {
		navigate(-1);
	};

	useEffect(async () => {
		setIsLoading(true);
		const { data } = await getAdmin(userId);
		setUserData(data);
		setIsLoading(false);
	}, []);

	return (
		<>
			{user?.role === 'manager' ? (
				<>
					{isLoading ? (
						<Grid container marginTop={5} maxWidth='100%' display='flex' justifyContent='center'>
							<CircularProgress />
						</Grid>
					) : (
						<>
							{userData && (
								<Box
									component='main'
									sx={{
										flexGrow: 1,
										py: 3
									}}
								>
									<Container maxWidth='lg'>
										<Button
											sx={{ textTransform: 'none', display: 'flex', alignItems: 'center' }}
											onClick={handleGoBack}
										>
											<KeyboardBackspaceIcon fontSize='small' /> Go back
										</Button>
										<Typography
											sx={{
												mb: 3,
												mt: 1,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}
											variant='h4'
										>
											Admin detail
										</Typography>
										<Grid container spacing={3}>
											<Grid item lg={4} md={6} xs={12}>
												<AccountProfile user={userData} />
											</Grid>
											<Grid item lg={8} md={6} xs={12}>
												<AccountProfileDetails user={userData} />
											</Grid>
										</Grid>
									</Container>
								</Box>
							)}
						</>
					)}
				</>
			) : (
				<>
					<br />
					<br />
					<Typography variant='h5' gutterBottom display='flex' justifyContent='center' color='red'>
						You are not authorized to do this
					</Typography>
				</>
			)}
		</>
	);
};

export default AdminDetail;
