import { toast } from 'react-toastify';

import * as api from '../api/auth';
import { authActions } from '../reducers/auth';
import { getUrlFromStorage, deleteUrlFromStorage } from '../helpers/localStorage';

export const signIn = (formData, navigate, setErrorCredential) => async (dispatch) => {
	try {
		dispatch(authActions.changeIsLoading(true));
		dispatch(authActions.changeSignInPending(true));
		const { data } = await api.signIn(formData);
		await dispatch(authActions.storeUser(data));
		navigate(getUrlFromStorage(), { replace: true });
		deleteUrlFromStorage();
	} catch ({ response }) {
		setErrorCredential(response?.data.message);
	} finally {
		dispatch(authActions.changeIsLoading(false));
		dispatch(authActions.changeSignInPending(false));
	}
};

export const googleSignIn = (token, navigate, setErrorCredential) => async (dispatch) => {
	try {
		dispatch(authActions.changeIsLoading(true));
		dispatch(authActions.changeGGSignInPending(true));
		const { data } = await api.googleSignIn(token);
		if (data?.userId) {
			await dispatch(authActions.storeUser(data));
			navigate(getUrlFromStorage(), { replace: true });
			toast.success('Google sign in was successful!', { autoClose: 3000 });
			deleteUrlFromStorage();
		}
	} catch ({ response }) {
		setErrorCredential(response?.data.message);
	} finally {
		dispatch(authActions.changeIsLoading(false));
		dispatch(authActions.changeGGSignInPending(false));
	}
};

export const signUp = (formData) => async (dispatch) => {
	try {
		dispatch(authActions.changeIsLoading(true));
		dispatch(authActions.changeSignUpPending(true));
		await api.signUp(formData);
		dispatch(authActions.changeIsLoading(false));
		dispatch(authActions.changeSignUpPending(false));
	} catch (error) {
		toast.error(error.message);
	}
};

export const changeLoading = () => async (dispatch) => {
	dispatch(authActions.changeIsLoading(true));
	dispatch(authActions.changeSignUpPending(false));
};

export const changePassword = (form, userId, navigate) => async (dispatch) => {
	try {
		await api.changePassword(form, userId);
		navigate('/auth/signin');
		await dispatch(authActions.freeUser());
		toast.success('Change password successfully!');
	} catch (error) {
		toast.error(error.message);
	} finally {
		//not thing
	}
};

export const forgotPassword = (email, setEmailError) => async (dispatch) => {
	try {
		dispatch(authActions.changeSignInPending(true));
		await api.forgotPassword({ email });
		toast.success('Please check your email to reset your password!');
	} catch ({ response }) {
		setEmailError(response?.data.message);
	} finally {
		dispatch(authActions.changeSignInPending(false));
	}
};

export const checkValidResetLink = (token, setLinkValid) => async () => {
	try {
		const { data } = await api.checkValidResetLink(token);
		setLinkValid(true);
		return data;
	} catch ({ response }) {
		setLinkValid(false);
		toast.error(response?.data.message);
	} finally {
		//not thing
	}
};

export const resetPassword = (formData, navigate) => async (dispatch) => {
	try {
		dispatch(authActions.changeSignInPending(true));
		await api.resetPassword(formData);
		toast.success('Your password has been changed successfully');
		setTimeout(() => {
			navigate('/auth/signin', { replace: true });
		}, 1500);
	} catch ({ response }) {
		toast.error(response?.data.message);
	} finally {
		dispatch(authActions.changeSignInPending(false));
	}
};
