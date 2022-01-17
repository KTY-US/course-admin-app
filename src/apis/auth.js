import API from './helper';

// API Auth
export const signIn = (form) => API.post('/auth/signin', form);
export const changePassword = (form, userId) => API.post(`/auth/changePassword/${userId}`, form);
