import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import React from 'react';
import Draggable from 'react-draggable';

const PaperComponent = (props) => {
	return (
		<Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
};
const DraggableDialog = ({ open, handleClose, handleCloseByClick }) => {
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperComponent={PaperComponent}
				aria-labelledby='draggable-dialog-title'
			>
				<DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
					{'Confirm'}
				</DialogTitle>
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

export default DraggableDialog;
