import React from 'react';
import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';

import { checkUserCode } from '../../../apis/user';
import { changeUserCode } from '../../../actions/user';
const AccountProfileDetails = ({ user }) => {
	const [userCode, setUserCode] = useState('no-thing');
	const [userCodeError, setUserCodeError] = useState('');
	const [isEnableChanged, setIsEnableChanged] = useState(false);

	const handleChange = (event) => {
		event.preventDefault();
		const userCode = event.target.value;
		setUserCode(userCode);
	};

	const handleCheckUserCode = async (event) => {
		event.preventDefault();

		if (userCode !== 'no-thing') {
			try {
				const { data: checkResult } = await checkUserCode({ code: userCode, userId: user.id });

				if (checkResult.isExisted) {
					setUserCodeError('This user code has already existed');
					setIsEnableChanged(false);
				} else {
					setUserCodeError('');
					setIsEnableChanged(true);
				}
			} catch ({ response }) {
				setUserCodeError(response?.data.message);
			}
		}
	};

	const handleChangeCode = async () => {
		const data = {
			userId: user.id,
			code: userCode
		};
		await changeUserCode(data);
		setIsEnableChanged(false);
		setUserCode('no-thing');
	};

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
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='Email address'
									name='email'
									value={user.email}
									variant='outlined'
									disabled
								/>
							</Grid>
							<Grid item md={6} xs={12}>
								<TextField
									fullWidth
									label='User code'
									name='userCode'
									defaultValue={user.userCode}
									variant='outlined'
									onBlur={handleCheckUserCode}
									onChange={handleChange}
									helperText={userCodeError}
									error={userCodeError !== ''}
								/>
							</Grid>
						</Grid>
					</CardContent>
					<Divider />
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							p: 2
						}}
					>
						<Button
							color='primary'
							variant='contained'
							disabled={!isEnableChanged}
							onClick={handleChangeCode}
						>
							Save changes
						</Button>
					</Box>
				</Card>
			)}
		</>
	);
};

export default AccountProfileDetails;
