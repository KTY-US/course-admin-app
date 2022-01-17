import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableCell, TableRow } from '@mui/material';
import moment from 'moment';

const CourseRow = ({ course, stt }) => {
	const navigate = useNavigate();
	const openCourse = () => {
		navigate(`/courses/${course?.id}`);
	};

	return (
		<>
			{course && (
				<TableRow key={stt} hover role='checkbox' onClick={openCourse} style={{ cursor: 'pointer' }}>
					<TableCell component='th' scope='row' align='center'>
						{stt}
					</TableCell>

					<TableCell>
						{course?.courseName.length > 60 ? course?.courseName.slice(0, 60) + '...' : course?.courseName}
					</TableCell>
					<TableCell>
						{course?.owner?.firstName} {course?.owner?.lastName}
					</TableCell>
					<TableCell align='center'>{course?.schoolYear}</TableCell>
					<TableCell align='center'>{moment(course?.createdAt).format('DD-MM-YYYY')}</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default CourseRow;
