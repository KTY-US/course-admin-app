import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Container, Grid, Typography, Button } from '@mui/material';

import { AccountSummary } from './AccountSummary';
import { ProfileDetails } from './ProfileDetails';
import { loadProfile } from '../../actions/user';
import { getUserInformationFromStorage } from '../../helpers/localStorage';
import ChangePasswordForm from '../Auth/ChangePassword/ChangePassword';

const UserProfile = () => {
	const { userInfo, email, isProfileLoading } = useSelector((state) => state.auth);
	const [open, setOpen] = useState(false);
	const summary = { ...userInfo, email };
	const dispatch = useDispatch();
	const { userId } = getUserInformationFromStorage();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(loadProfile(userId, navigate));
	}, []);

	const handleChangePasswordForm = () => {
		setOpen(true);
	};

	return (
		<>
			{open && <ChangePasswordForm open={open} setOpen={setOpen} />}
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					py: 8
				}}
			>
				<Container maxWidth='lg'>
					<Typography sx={{ mb: 3 }} variant='h4' display='flex' justifyContent='center'>
						My Profile
					</Typography>

					<Grid container spacing={3}>
						{isProfileLoading ? (
							<Grid container marginTop={5} maxWidth='100%' display='flex' justifyContent='center'>
								<CircularProgress />
							</Grid>
						) : (
							<>
								<Grid item lg={4} md={6} xs={12}>
									<AccountSummary userInfo={summary} />
									<Box style={{ display: 'flex', justifyContent: 'center' }} fullWidth>
										<Typography
											style={{ textDecoration: 'none', marginTop: '15px' }}
											variant='h6'
											component={Button}
											onClick={handleChangePasswordForm}
										>
											Change password
										</Typography>
									</Box>
								</Grid>
								<Grid item lg={8} md={6} xs={12}>
									<ProfileDetails />
								</Grid>
							</>
						)}
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default UserProfile;
