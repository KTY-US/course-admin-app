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
	Typography,
	IconButton,
	Box
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getCourses } from '../../actions/course';
import Pagination from '../Pagination/Pagination';
import CourseRow from './Course/CourseRow';
import { useQuery } from '../../helpers/queryString';

const ROWS_PER_PAGE = -1;

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
	const { isLoading = false, courses, total } = useSelector((state) => state.course);
	const [rowsPerPage, setRowsPerPage] = useState(+query.get('rowsPerPage') || ROWS_PER_PAGE);
	const [page, setPage] = useState(+query.get('page') || 0);
	const [searchString, setSearchString] = useState(query.get('search') || '');

	const [sortMode, setSortMode] = useState('time-desc');
	const numberOfPages = Math.ceil(total / rowsPerPage) - 1 < 0 ? 0 : Math.ceil(total / rowsPerPage) - 1;

	if (rowsPerPage < -1) {
		setRowsPerPage(-1);
	}
	const handleSortModeChange = (event) => {
		event.preventDefault;
		const { value } = event.target;
		setSortMode(value);
	};
	const handleSearch = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const search = data.get('search');
		setSearchString(search);
	};
	useEffect(() => {
		let url = `/courses?page=${page}&rowsPerPage=${rowsPerPage}&sortMode=${sortMode}`;

		if (searchString !== '') {
			const encodedSearch = encodeURIComponent(searchString);
			url = url + `&search=${encodedSearch}`;
			dispatch(getCourses(page + 1, rowsPerPage, sortMode, encodedSearch));
		} else {
			dispatch(getCourses(page + 1, rowsPerPage, sortMode));
		}

		navigate(url, { replace: true });
	}, [page, rowsPerPage, sortMode, searchString]);

	const coursesJSX = isLoading ? (
		<LinearProgress />
	) : (
		<>
			<Typography
				variant='h4'
				gutterBottom
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				COURSE MANAGEMENT
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
				<Paper
					component='form'
					onSubmit={handleSearch}
					sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
				>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder='Search Name or Email'
						inputProps={{ 'aria-label': 'search google maps' }}
						name='search'
						defaultValue={searchString}
					/>
					<IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
						<SearchIcon />
					</IconButton>
				</Paper>
				<FormControl sx={{ m: 1, minWidth: 135 }}>
					<InputLabel id='demo-simple-select-helper-label'>Sort By Time</InputLabel>
					<Select
						labelId='demo-simple-select-helper-label'
						id='demo-simple-select-helper'
						value={sortMode}
						label='Sort By Time'
						onChange={handleSortModeChange}
					>
						<MenuItem value='time-asc'>ASC</MenuItem>
						<MenuItem value='time-desc'>DESC</MenuItem>
					</Select>
				</FormControl>
			</Box>
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
										<CourseRow
											key={course.id}
											course={course}
											stt={page * rowsPerPage + index + 1}
										/>
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
