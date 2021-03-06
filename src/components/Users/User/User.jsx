import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableCell, TableRow } from '@mui/material';

const User = ({ user, stt }) => {
	const navigate = useNavigate();
	const openUser = () => {
		navigate(`/users/${user.id}`);
	};
	const getFullName = (firstName, lastName) => {
		const fullName = firstName + ' ' + lastName;
		if (fullName.length > 60) return fullName.slice(0, 60) + '...';

		return fullName;
	};
	return (
		<>
			{user && (
				<TableRow hover role='checkbox' onClick={openUser} style={{ cursor: 'pointer' }}>
					<TableCell component='th' scope='row' align='center'>
						{stt}
					</TableCell>
					<TableCell>{user.firstName}</TableCell>
					<TableCell>{user.lastName}</TableCell>
					<TableCell>{getFullName(user.firstName, user.lastName)}</TableCell>
					<TableCell>{user.email}</TableCell>
					<TableCell align='center'>{user.userCode}</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default User;
