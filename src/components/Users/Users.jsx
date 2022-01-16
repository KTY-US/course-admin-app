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

import { getUsers } from '../../actions/user';
import Pagination from '../Pagination/Pagination';
import User from './User/User';
import { useQuery } from '../../helpers/queryString';
import { getUserInformationFromStorage } from '../../helpers/localStorage';

const ROWS_PER_PAGE = -1;

const columns = [
	{ id: 'stt', label: 'STT', minWidth: 50, align: 'center' },
	{ id: 'fullName', label: 'Full name', minWidth: 280 },
	{
		id: 'email',
		label: 'Email',
		minWidth: 150
	},
	{
		id: 'userCode',
		label: 'User code',
		minWidth: 50,
		align: 'center'
	},
	{
		id: 'status',
		label: 'Status',
		minWidth: 50,
		align: 'center'
	}
];

const Users = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const query = useQuery();
	const { isLoading, users, total } = useSelector((state) => state.user);
	const [rowsPerPage, setRowsPerPage] = useState(+query.get('rowsPerPage') || ROWS_PER_PAGE);
	const [page, setPage] = useState(+query.get('page') || 0);
	const [sortMode, setSortMode] = useState(query.get('sortMode') || 'time-desc');
	const numberOfPages = Math.ceil(total / rowsPerPage) - 1 < 0 ? 0 : Math.ceil(total / rowsPerPage) - 1;

	if (rowsPerPage < -1) {
		setRowsPerPage(-1);
	}

	const handleChange = (event) => {
		setSortMode(event.target.value);
	};

	useEffect(() => {
		navigate(`/users?page=${page}&rowsPerPage=${rowsPerPage}&sortMode=${sortMode}`, { replace: true });
		dispatch(getUsers(page + 1, rowsPerPage, sortMode));
	}, [page, rowsPerPage, sortMode]);

	const coursesJSX = isLoading ? (
		<LinearProgress />
	) : (
		<>
			<Typography
				variant='h4'
				gutterBottom
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				Users
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
				<Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder='Search Name or Email'
						inputProps={{ 'aria-label': 'search google maps' }}
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
						onChange={handleChange}
					>
						<MenuItem value='time-asc'>ASC</MenuItem>
						<MenuItem value='time-desc'>DESC</MenuItem>
					</Select>
				</FormControl>
			</Box>
			{total > 0 ? (
				<Paper sx={{ width: '100%', overflow: 'hidden' }}>
					<TableContainer>
						<Table aria-label='sticky table'>
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
								{users.map((user, index) => {
									return <User key={user.id} user={user} stt={page * rowsPerPage + index + 1} />;
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

export default Users;
