import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, Typography, useMediaQuery } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { NavItem } from './nav-item';
import SchoolIcon from '@mui/icons-material/School';

const items = [
	{
		href: '/',
		icon: <ManageAccountsIcon fontSize='small' />,
		title: 'Admins'
	},
	{
		href: '/customers',
		icon: <SupervisorAccountIcon fontSize='small' />,
		title: 'Users'
	},
	{
		href: '/products',
		icon: <SchoolIcon fontSize='small' />,
		title: 'Courses'
	}
];

export const DashboardSidebar = (props) => {
	const { open, onClose } = props;
	// const router = useRouter();
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
		defaultMatches: true,
		noSsr: false
	});

	// useEffect(() => {
	// 	if (!router.isReady) {
	// 		return;
	// 	}

	// 	if (open) {
	// 		onClose?.();
	// 	}
	// });

	const content = (
		<>
			<Box
				sx={{
					height: '100%'
				}}
			>
				<Box
					sx={{
						alignItems: 'center',
						cursor: 'pointer',
						display: 'flex',
						justifyContent: 'center',
						height: '10%',
						textDecoration: 'none'
					}}
					component={Link}
					to={'/'}
				>
					<div>
						<Typography color='black' variant='h4' sx={{ display: 'flex', justifyContent: 'center' }}>
							Admin page
						</Typography>
					</div>
				</Box>

				<br />
				<br />
				<br />
				<br />

				<Box sx={{ flexGrow: 1, px: 1 }}>
					{items.map((item) => (
						<NavItem
							key={item.title}
							icon={item.icon}
							href={item.href}
							title={item.title}
							sx={{ marginBottom: '5px' }}
						/>
					))}
				</Box>
			</Box>
		</>
	);

	if (lgUp) {
		return (
			<Drawer
				anchor='left'
				open
				PaperProps={{
					sx: {
						backgroundColor: 'neutral.900',
						color: '#FFFFFF',
						width: 220
					}
				}}
				variant='permanent'
			>
				{content}
			</Drawer>
		);
	}

	return (
		<Drawer
			anchor='left'
			onClose={onClose}
			open={open}
			PaperProps={{
				sx: {
					backgroundColor: 'neutral.900',
					color: '#FFFFFF',
					width: 220
				}
			}}
			sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
			variant='temporary'
		>
			{content}
		</Drawer>
	);
};
