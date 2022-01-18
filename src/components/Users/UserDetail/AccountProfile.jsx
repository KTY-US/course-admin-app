import React, { useState } from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';

import { changeStatus, getUser } from '../../../apis/user';

const AccountProfile = ({ user }) => {
	const [statusAccount, setStatusAccount] = useState(user ? user.status : '');
	const handleChangeStatus = async () => {
		const res = await changeStatus(user.id);

		if (res) {
			const { data } = await getUser(user.id);
			if (data.status === 'blocked') {
				setStatusAccount('blocked');
			} else if (data.status === 'active') {
				setStatusAccount('active');
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
						{statusAccount === 'active' && (
							<Button color='primary' variant='contained' fullWidth onClick={handleChangeStatus}>
								Block
							</Button>
						)}
						{statusAccount === 'blocked' && (
							<Button color='secondary' variant='contained' fullWidth onClick={handleChangeStatus}>
								UnBlock
							</Button>
						)}
					</CardActions>
				</Card>
			)}
		</>
	);
};

export default AccountProfile;
