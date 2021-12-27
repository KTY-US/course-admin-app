import axios from 'axios';

import { getUserInformationFromStorage } from '../helpers/localStorage';

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_DOMAIN });

API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${getUserInformationFromStorage().token}`;
	}
	return req;
});

export default API;
