import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	useMediaQuery,
	DialogContentText,
	DialogTitle
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ResponsiveDialog = ({ open, handleClose, handleCloseByClick }) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<div>
			<Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
				<DialogTitle id='responsive-dialog-title'>{'Confirm'}</DialogTitle>
				<DialogContent>
					<DialogContentText>Do you want to save changes?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button value='disagree' autoFocus onClick={handleCloseByClick}>
						Disagree
					</Button>
					<Button value='agree' onClick={handleCloseByClick} autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ResponsiveDialog;
