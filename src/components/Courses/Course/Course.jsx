import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableCell, TableRow } from '@mui/material';
import moment from 'moment';

const Course = ({ course, stt }) => {
	const navigate = useNavigate();
	const openCourse = () => {
		navigate(`/courses/${course.id}/c`);
	};
	return (
		<>
			{/* nhớ if course? */}
			<TableRow hover role='checkbox' onClick={openCourse} style={{ cursor: 'pointer' }}>
				<TableCell component='th' scope='row' align='center'>
					{/* {stt} */}1
				</TableCell>

				<TableCell>
					{/* {course.courseName.length > 60 ? course.courseName.slice(0, 60) + '...' : course.courseName} */}
					Mon Hoc Dau tien
				</TableCell>
				<TableCell>
					Bui Huynh Trung Tin
					{/* {course?.owner?.firstName} {course?.owner?.lastName} */}
				</TableCell>
				<TableCell align='center'>
					{/* {course?.schoolYear} */}
					2021
				</TableCell>
				<TableCell align='center'>
					{/* {moment(course?.createdAt).format('DD-MM-YYYY')} */}
					{moment('20/12/2021').format('DD-MM-YYYY')}
				</TableCell>
			</TableRow>
		</>
	);
};

export default Course;
