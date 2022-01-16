import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	CircularProgress,
	CardHeader,
	Container,
	Divider,
	TextField,
	Grid,
	Typography,
	Card,
	CardContent,
	Box
} from '@mui/material';
import createStyles from './styles';
import { getCourseDetails } from '../../../actions/course';
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const DateConverter = (date) => {
	return new Date(date).toLocaleTimeString(undefined, options);
};

const CourseDetail = () => {
	const { courseId } = useParams();
	const dispatch = useDispatch();
	const classes = createStyles();

	const { isLoading, details: courseData } = useSelector((state) => state.courseDetail);
	useEffect(() => {
		dispatch(getCourseDetails(courseId));
	}, []);
	console.log(courseData);
	return (
		<>
			{isLoading ? (
				<Grid container display='flex' justifyContent='center'>
					<CircularProgress size={30} sx={{ marginBottom: 2, marginTop: 10 }} />
				</Grid>
			) : (
				<>
					{courseData ? (
						<Container className={classes.container}>
							<Typography variant='h4' align='center'>
								Course Detail
							</Typography>
							<Card sx={{ marginTop: 15, margin: 'auto' }}>
								<CardHeader subheader='The information cannot be edited' title='Course owner' />
								<Divider />
								<CardContent>
									<Box
										sx={{
											alignItems: 'center',
											display: 'flex',
											flexDirection: 'column'
										}}
									></Box>
									<Grid container spacing={3}>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label='Owner ID'
												name='ownerId'
												disabled
												value={courseData?.owner?.id}
												variant='outlined'
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label='First name'
												name='firstName'
												value={courseData?.owner?.firstName}
												variant='outlined'
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label='Last name'
												name='lastName'
												value={courseData?.owner?.lastName}
												variant='outlined'
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label='Email Address'
												name='email'
												value={courseData?.owner?.email}
												variant='outlined'
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label='User Code'
												name='userCode'
												value={courseData?.owner?.userCode}
												variant='outlined'
											/>
										</Grid>
									</Grid>
								</CardContent>
							</Card>

							<Card sx={{ marginTop: 15, margin: 'auto' }}>
								<CardHeader subheader='The information cannot be edited' title='Course details' />
								<Divider />
								<CardContent>
									<Box
										sx={{
											alignItems: 'center',
											display: 'flex',
											flexDirection: 'column'
										}}
									></Box>
									<Grid container spacing={3}>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label='Course ID'
												name='courseId'
												disabled
												value={courseData.id}
												variant='outlined'
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label='Course Name'
												name='courseName'
												disable
												value={courseData?.courseName}
												variant='outlined'
											/>
										</Grid>

										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label='School Year'
												name='schoolYear'
												disable
												value={courseData?.schoolYear}
												variant='outlined'
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label='Invite Code'
												name='inviteCode'
												disable
												value={courseData?.code}
												variant='outlined'
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label='Create Time'
												name='createTime'
												disable
												value={DateConverter(courseData?.createdAt)}
												variant='outlined'
											/>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Container>
					) : (
						<Typography align='center'>Cannot get details of course</Typography>
					)}
				</>
			)}
		</>
	);
};

export default CourseDetail;
