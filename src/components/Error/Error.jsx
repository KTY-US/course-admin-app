import React from 'react';
import { Typography } from '@mui/material';

import useStyles from './styles';
import errorLogo from '../../images/error.png';

const Error = ({ content }) => {
	const classes = useStyles();

	return (
		<>
			<div className={`${classes.content} ${classes.root}`}>
				<Typography variant='h4'>{content}</Typography>
			</div>
			<br />
			<div className={classes.content}>
				<img src={errorLogo} width='7%' />
			</div>
		</>
	);
};

export default Error;
