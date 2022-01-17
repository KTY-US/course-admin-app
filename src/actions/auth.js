import { toast } from 'react-toastify';

import * as api from '../apis/auth';
import { authActions } from '../reducers/auth';

export const signIn = (formData, navigate, setErrorCredential) => async (dispatch) => {
	try {
		dispatch(authActions.changeIsLoading(true));
		dispatch(authActions.changeSignInPending(true));
		const { data } = await api.signIn(formData);
		await dispatch(authActions.storeUser(data));
		navigate('/', { replace: true });
	} catch ({ response }) {
		setErrorCredential(response?.data.message);
	} finally {
		dispatch(authActions.changeIsLoading(false));
		dispatch(authActions.changeSignInPending(false));
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
