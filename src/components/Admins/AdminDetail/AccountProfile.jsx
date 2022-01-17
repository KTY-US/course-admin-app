import React from 'react';
import { Avatar, Box, Card, CardContent, Divider, Typography } from '@mui/material';

const AccountProfile = ({ user }) => {
	return (
		<>
			{user && (
				<Card>
					<CardContent>
						<Box
							sx={{
								alignItems: 'center',
								display: 'flex',
								flexDirection: 'column'
							}}
						>
							<Avatar
								src={user.avatar}
								sx={{
									height: 64,
									mb: 2,
									width: 64
								}}
							/>
							<Typography color='textPrimary' gutterBottom variant='h5'>
								{user.firstName + ' ' + user.lastName}
							</Typography>
						</Box>
					</CardContent>
					<Divider />
				</Card>
			)}
		</>
	);
};

export default AccountProfile;
