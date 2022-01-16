import React from 'react';
import { Avatar, Box, Card, CardHeader, CardActions, CardContent, Divider, Typography } from '@mui/material';

export const AccountSummary = (props) => {
	const info = props.userInfo;
	return (
		<Card>
			<CardHeader title='Summary' subheader='This is account summary'></CardHeader>
			<Divider />
			<CardContent>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<Avatar alt={info?.firstName} sx={{ height: 64, mb: 2, width: 64 }}>
						{info?.firstName?.charAt(0).toUpperCase()}
					</Avatar>
					<Typography color='textPrimary' gutterBottom variant='h5'>
						{`${info?.firstName} ${info?.lastName}`}
					</Typography>
					<Typography color='textSecondary' variant='body2'>
						{info?.email}
					</Typography>
				</Box>
			</CardContent>
			<Divider />
			<CardActions>
				{/* <Button disable={true} color='primary' fullWidth variant='text'>
					Upload picture
				</Button> */}
			</CardActions>
		</Card>
	);
};
