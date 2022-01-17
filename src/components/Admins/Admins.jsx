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

import { getAdmins } from '../../actions/admin';
import Pagination from '../Pagination/Pagination';
import Admin from './Admin/Admin';
import { useQuery } from '../../helpers/queryString';
import { getUserInformationFromStorage } from '../../helpers/localStorage';

const ROWS_PER_PAGE = -1;

const columns = [
	{ id: 'stt', label: 'STT', minWidth: 50, align: 'center' },
	{ id: 'username', label: 'username', minWidth: 150 },
	{
		id: 'firstName',
		label: 'First name',
		minWidth: 80
	},
	{
		id: 'lastName',
		label: 'Last name',
		minWidth: 80
	},
	{
		id: 'role',
		label: 'Role',
		minWidth: 50,
		align: 'center'
	}
];

const Admins = () => {
	const user = getUserInformationFromStorage();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const query = useQuery();
	const { isLoading, admins, total } = useSelector((state) => state.admin);
	const [rowsPerPage, setRowsPerPage] = useState(+query.get('rowsPerPage') || ROWS_PER_PAGE);
	const [page, setPage] = useState(+query.get('page') || 0);
	const [sortMode, setSortMode] = useState(query.get('sortMode') || 'time-desc');
	const [searchString, setSearchString] = useState(query.get('search') || '');
	const numberOfPages = Math.ceil(total / rowsPerPage) - 1 < 0 ? 0 : Math.ceil(total / rowsPerPage) - 1;

	if (rowsPerPage < -1) {
		setRowsPerPage(-1);
	}

	const handleChange = (event) => {
		setSortMode(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const search = data.get('search');
		setSearchString(search);
	};
	useEffect(() => {
		let url = `/admins?page=${page}&rowsPerPage=${rowsPerPage}&sortMode=${sortMode}`;
		if (searchString !== '') {
			const encodedSearch = encodeURIComponent(searchString);
			url = url + `&search=${encodedSearch}`;
			dispatch(getAdmins(page + 1, rowsPerPage, sortMode, encodedSearch));
		} else {
			dispatch(getAdmins(page + 1, rowsPerPage, sortMode, ''));
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
				Admin
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
				<Paper
					onSubmit={handleSubmit}
					component='form'
					sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
				>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder='Search Name or Email'
						inputProps={{ 'aria-label': 'search google maps' }}
						name='search'
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
								{admins.map((user, index) => {
									return <Admin key={user.id} user={user} stt={page * rowsPerPage + index + 1} />;
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
					You have {total} admin(s).
				</Typography>
			)}
		</>
	);

	return (
		<>
			<br />
			<br />
			{user?.role === 'manager' ? (
				<>{coursesJSX}</>
			) : (
				<>
					<Typography variant='h5' gutterBottom display='flex' justifyContent='center' color='red'>
						You are not authorized to do this
					</Typography>
				</>
			)}
		</>
	);
};

export default Admins;
