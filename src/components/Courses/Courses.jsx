import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	LinearProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';

import { getCourses } from '../../actions/course';
import Pagination from '../Pagination/Pagination';
import Course from './Course/Course';
import { useQuery } from '../../helpers/queryString';
import { getUserInformationFromStorage } from '../../helpers/localStorage';

const ROWS_PER_PAGE = 20;

const columns = [
	{ id: 'stt', label: 'STT', minWidth: 50, align: 'center' },
	{ id: 'courseName', label: 'Course name', minWidth: 280 },
	{
		id: 'teacher',
		label: 'Teacher',
		minWidth: 150
	},
	{
		id: 'schoolYear',
		label: 'School year',
		minWidth: 50,
		align: 'center'
	},
	{
		id: 'startDate',
		label: 'Start date',
		minWidth: 50,
		align: 'center'
	}
];

const Courses = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const query = useQuery();
	const { isLoading, courses, total } = useSelector((state) => state.course);
	const [rowsPerPage, setRowsPerPage] = useState(+query.get('rowsPerPage') || ROWS_PER_PAGE);
	const [page, setPage] = useState(+query.get('page') || 0);

	const numberOfPages = Math.ceil(total / rowsPerPage) - 1 < 0 ? 0 : Math.ceil(total / rowsPerPage) - 1;

	if (rowsPerPage < -1) {
		setRowsPerPage(-1);
	}

	// useEffect(() => {
	// 	const userId = getUserInformationFromStorage().userId;
	// 	navigate(`/courses?page=${page}&rowsPerPage=${rowsPerPage}`, { replace: true });
	// 	dispatch(getCourses(page + 1, rowsPerPage, userId));
	// }, [page, rowsPerPage]);

	const coursesJSX = isLoading ? (
		<LinearProgress />
	) : (
		<>
			{total > 0 ? (
				<Paper sx={{ width: '100%', overflow: 'hidden' }}>
					<TableContainer>
						<Table stickyHeader aria-label='sticky table'>
							<TableHead>
								<TableRow>
									{columns.map((column) => (
										<TableCell
											key={column.id}
											align={column.align}
											style={{ minWidth: column.minWidth }}
										>
											{column.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{courses.map((course, index) => {
									return (
										<Course key={course.id} course={course} stt={page * rowsPerPage + index + 1} />
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
					<Pagination
						total={total}
						rowsPerPage={rowsPerPage}
						setPage={setPage}
						page={page > numberOfPages || page < 0 ? setPage(0) : page}
						setRowsPerPage={setRowsPerPage}
					/>
				</Paper>
			) : (
				<Typography variant='h5' gutterBottom>
					You have {total} course.
				</Typography>
			)}
		</>
	);

	return (
		<>
			<br />
			<br />
			{coursesJSX}
		</>
	);
};

export default Courses;
