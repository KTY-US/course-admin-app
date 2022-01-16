import { toast } from 'react-toastify';

import * as API from '../apis/admin';

export const createAdmin = (form, navigate, setErrorCredential) => async () => {
	try {
		await API.createAdmin(form);
		navigate('/admins');
		toast.success('Create admin account successful!!!');
	} catch ({ response }) {
		setErrorCredential(response?.data.message);
	} finally {
		// no-thing
	}
};
