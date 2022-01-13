import API from './helper';

// API Auth
export const signIn = (form) => API.post('/auth/signin', form);
export const googleSignIn = (token) => API.post('/auth/googlesignin', token);
export const signUp = (form) => API.post('/auth/sign-up', form);
export const checkEmail = (email) => API.post('/auth/check-email', email);
export const activateAccount = (token) => API.get(`/auth/activate/${token}`);
export const changePassword = (form, userId) => API.post(`/auth/changePassword/${userId}`, form);
export const forgotPassword = (email) => API.post('/auth/forgot-password', email);
export const checkValidResetLink = (token) => API.get(`auth/reset-password/${token}`);
export const resetPassword = async (formData) =>
	API.post(`/auth/reset-password/${formData.userId}`, { newPassword: formData.newPassword });
