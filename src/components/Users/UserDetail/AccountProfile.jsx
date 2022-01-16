import React from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';

const user = {
	avatar: '/static/images/avatars/avatar_6.png',
	city: 'Los Angeles',
	country: 'USA',
	jobTitle: 'Senior Developer',
	name: 'Katarina Smith'
};

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
					<CardActions>
						<Button color='primary' fullWidth variant='text'>
							Block
						</Button>
					</CardActions>
				</Card>
			)}
		</>
	);
};

export default AccountProfile;
