import React from 'react';
import { Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';

const AccountProfileDetails = ({ user }) => {
	return (
		<>
			{user && (
				<Card>
					<CardHeader subheader='You can map or un-map a user code' title='Profile' />
					<Divider />
					<CardContent>
						<Grid container spacing={3}>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='username'
									name='username'
									value={user.username}
									variant='outlined'
									disabled
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='First name'
									name='firstName'
									variant='outlined'
									value={user.firstName}
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
						</Grid>
					</CardContent>
					<Divider />
				</Card>
			)}
		</>
	);
};

export default AccountProfileDetails;
