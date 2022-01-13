import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, IconButton, TablePagination } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

const TablePaginationActions = ({ count, page, rowsPerPage, onPageChange }) => {
	const theme = useTheme();
	const numberOfPages = Math.ceil(count / rowsPerPage) - 1;
	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, numberOfPages);
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label='first page'>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label='previous page'>
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton onClick={handleNextButtonClick} disabled={page >= numberOfPages} aria-label='next page'>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton onClick={handleLastPageButtonClick} disabled={page >= numberOfPages} aria-label='last page'>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
};

const Pagination = ({ total, rowsPerPage, page, setRowsPerPage, setPage }) => {
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	return (
		<TablePagination
			rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
			component='div'
			count={total}
			rowsPerPage={rowsPerPage}
			page={page}
			onPageChange={handleChangePage}
			onRowsPerPageChange={handleChangeRowsPerPage}
			ActionsComponent={TablePaginationActions}
		/>
	);
};

export default Pagination;
