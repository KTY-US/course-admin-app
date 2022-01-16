import { toast } from 'react-toastify';

import * as API from '../apis/user';
import { authActions } from '../reducers/auth';

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
