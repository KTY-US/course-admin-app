import API from './helper';

// API Auth
export const signIn = (form) => API.post('/auth/signin', form);
