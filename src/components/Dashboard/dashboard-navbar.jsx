import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, MenuItem, Menu, Typography, Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { AccountCircle } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';

import { authActions } from '../../reducers/auth';
import ChangePasswordForm from '../Auth/ChangePassword/ChangePassword';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = ({ user, setUser, onSidebarOpen, ...other }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const [openChangePasswordForm, setOpenChangePasswordForm] = useState(false);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleSignIn = () => {
		handleMobileMenuClose();
		navigate('/auth/signin');
	};

	const handleSignOut = () => {
		handleMenuClose();
		logout();
	};

	const logout = () => {
		dispatch(authActions.freeUser());
		setUser(null);
		window.location.replace('/');
	};

	const handleChangePassword = () => {
		handleMenuClose();
		setOpenChangePasswordForm(true);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			id={menuId}
			anchorEl={anchorEl}
			keepMounted
			open={isMenuOpen}
			onClose={handleMenuClose}
			PaperProps={{
				elevation: 0,
				sx: {
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: 1.5,
					'& .MuiAvatar-root': {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1
					},
					'&:before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						top: 0,
						right: 14,
						width: 10,
						height: 10,
						bgcolor: 'background.paper',
						transform: 'translateY(-50%) rotate(45deg)',
						zIndex: 0
					}
				}
			}}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
		>
			<MenuItem onClick={handleChangePassword}>Change password</MenuItem>
			<MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			PaperProps={{
				elevation: 0,
				sx: {
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: 1.5,
					'& .MuiAvatar-root': {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1
					},
					'&:before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						top: 0,
						right: 14,
						width: 10,
						height: 10,
						bgcolor: 'background.paper',
						transform: 'translateY(-50%) rotate(45deg)',
						zIndex: 0
					}
				}
			}}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			id={mobileMenuId}
			keepMounted
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{user ? (
				<div>
					<MenuItem onClick={handleProfileMenuOpen}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='primary-search-account-menu'
							aria-haspopup='true'
							color='inherit'
						>
							<AccountCircle />
						</IconButton>
						<p>User</p>
					</MenuItem>
				</div>
			) : (
				<MenuItem onClick={handleSignIn}>
					<IconButton size='large' color='inherit'>
						<LoginIcon />
					</IconButton>
					Sign In
				</MenuItem>
			)}
		</Menu>
	);

	return (
		<>
			{openChangePasswordForm && (
				<ChangePasswordForm open={openChangePasswordForm} setOpen={setOpenChangePasswordForm} />
			)}
			<DashboardNavbarRoot
				sx={{
					left: {
						lg: 220
					},
					width: {
						lg: 'calc(100% - 220px)'
					}
				}}
				{...other}
			>
				<Toolbar
					disableGutters
					sx={{
						minHeight: 64,
						left: 0,
						px: 2
					}}
				>
					<IconButton
						onClick={onSidebarOpen}
						sx={{
							display: {
								xs: 'inline-flex',
								lg: 'none'
							}
						}}
					>
						<MenuIcon fontSize='small' />
					</IconButton>

					<Box sx={{ flexGrow: 1 }} />

					<Typography
						variant='h6'
						noWrap
						component={Link}
						to='/courses'
						underline='none'
						style={{ textDecoration: 'none' }}
					>
						ADMIN PAGE
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{user ? (
							<>
								<IconButton
									size='large'
									edge='end'
									aria-label='account of current user'
									aria-controls={menuId}
									aria-haspopup='true'
									onClick={handleProfileMenuOpen}
									color='inherit'
								>
									<Avatar sx={{ bgcolor: deepPurple[600] }} alt={user?.firstName}>
										{user?.firstName?.charAt(0).toUpperCase()}
									</Avatar>
								</IconButton>
							</>
						) : (
							<Typography
								component={Link}
								to='/auth/signin'
								variant='body'
								noWrap
								underline='none'
								color='black'
								style={{ textDecoration: 'none' }}
							>
								Sign In
							</Typography>
						)}
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
				{renderMobileMenu}
				{renderMenu}
			</DashboardNavbarRoot>
		</>
	);
};
