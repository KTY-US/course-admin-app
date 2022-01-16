import { toast } from 'react-toastify';

import * as api from '../apis/user';
import { userActions } from '../reducers/user';

export const getUsers = (page, rowPerPage, sortMode) => async (dispatch) => {
	try {
		dispatch(userActions.changeIsLoading(true));
		const { data } = await api.getUsers(page, rowPerPage, sortMode);
		dispatch(userActions.storeUsers(data));
	} catch (error) {
		toast.error(error.message);
	} finally {
		dispatch(userActions.changeIsLoading(false));
	}
};

export const loadProfile = (formData, navigate) => async (dispatch) => {};
