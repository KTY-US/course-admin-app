import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableCell, TableRow } from '@mui/material';
import moment from 'moment';

const User = ({ user, stt }) => {
	const navigate = useNavigate();
	const openUser = () => {
		//navigate(`/courses/${course.id}/c`);
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

					<TableCell>{getFullName(user.firstName, user.lastName)}</TableCell>
					<TableCell>{user.email}</TableCell>
					<TableCell align='center'>{user.userCode}</TableCell>
					<TableCell align='center'>{user.status}</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default User;
