import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableCell, TableRow } from '@mui/material';

const User = ({ user, stt }) => {
	const navigate = useNavigate();
	const openUser = () => {
		navigate(`/admins/${user.id}`);
	};

	return (
		<>
			{user && (
				<TableRow hover role='checkbox' onClick={openUser} style={{ cursor: 'pointer' }}>
					<TableCell component='th' scope='row' align='center'>
						{stt}
					</TableCell>
					<TableCell>{user.username}</TableCell>
					<TableCell>{user.firstName}</TableCell>
					<TableCell>{user.lastName}</TableCell>
					<TableCell align='center'>{user.role}</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default User;
