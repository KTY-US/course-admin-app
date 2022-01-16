import { toast } from 'react-toastify';

import * as API from '../apis/user';
import { authActions } from '../reducers/auth';

export const updateProfile = (formData, navigate, setErrorCredential) => async (dispatch) => {
	try {
		dispatch(authActions.changeIsLoading(true));
		const { data } = await API.updateProfile(formData);
		await dispatch(authActions.updateProfile(data));
		const { userId } = data;
		navigate(`/user/${userId}`);
		toast.success('Update profile successful!!!');
	} catch ({ response }) {
		setErrorCredential(response?.data.message);
	} finally {
		dispatch(authActions.changeIsLoading(false));
	}
};

export const loadProfile = (formData, navigate) => async (dispatch) => {
	try {
		dispatch(authActions.changeIsProfileLoading(true));
		const { data } = await API.loadProfile(formData);
		await dispatch(authActions.storeProfile(data));
	} catch ({ response }) {
		navigate('/not-found');
		toast.error(response?.data.message);
	} finally {
		dispatch(authActions.changeIsProfileLoading(false));
	}
};
