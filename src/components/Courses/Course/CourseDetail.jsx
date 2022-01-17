import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
	CircularProgress,
	CardHeader,
	Container,
	Divider,
	TextField,
	Grid,
	Button,
	Typography,
	Card,
	CardContent,
	Box
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import createStyles from './styles';
import { getCourseDetails } from '../../../actions/course';
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const DateConverter = (date) => {
	return new Date(date).toLocaleTimeString(undefined, options);
};

const CourseDetail = () => {
	const navigate = useNavigate();
	const { courseId } = useParams();
	const dispatch = useDispatch();
	const classes = createStyles();

	const { isLoading, details: courseData } = useSelector((state) => state.courseDetail);

	const handleGoBack = () => {
		navigate(-1);
	};
	useEffect(() => {
		dispatch(getCourseDetails(courseId));
	}, []);
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
							<Grid container sx={{ maxWidth: 'md', margin: 'auto' }}>
								<Grid display='flex' justifyContent='flex-start' width='md'>
									<Button
										className={classes.display}
										sx={{ textTransform: 'none' }}
										onClick={handleGoBack}
									>
										<KeyboardBackspaceIcon fontSize='small' /> Go back
									</Button>
								</Grid>
							</Grid>
							<Typography
								sx={{ fontSize: { lg: 30, md: 25, sm: 20, xs: 18 }, fontWeight: 'bolder' }}
								align='center'
							>
								COURSE DETAILS
							</Typography>
							<Card sx={{ marginTop: 15, margin: 'auto' }}>
								<CardHeader>
									<Typography>COURSE DETAILS</Typography>
								</CardHeader>
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
												value={
													courseData?.owner?.userCode === ''
														? 'Empty'
														: courseData?.owner?.userCode
												}
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
												value={courseData?.courseName}
												variant='outlined'
											/>
										</Grid>

										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label='School Year'
												name='schoolYear'
												value={courseData?.schoolYear}
												variant='outlined'
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label='Invite Code'
												name='inviteCode'
												value={courseData?.code}
												variant='outlined'
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label='Create Time'
												name='createTime'
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
