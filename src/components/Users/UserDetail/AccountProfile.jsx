import React, { useState } from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';

import { changeStatus } from '../../../apis/user';

const AccountProfile = ({ user }) => {
	const [statusAccount, setStatusAccount] = useState(user ? user.status : '');
	const handleChangeStatus = async () => {
		const res = await changeStatus(user.id);

		if (res) {
			if (user.status === 'blocked') {
				setStatusAccount('active');
			} else if (user.status === 'active') {
				setStatusAccount('blocked');
			}
		}
	};
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
						<Button color='primary' fullWidth variant='text' onClick={handleChangeStatus}>
							{statusAccount === 'active' && 'Block'}
							{statusAccount === 'blocked' && 'Unblock'}
						</Button>
					</CardActions>
				</Card>
			)}
		</>
	);
};

export default AccountProfile;
