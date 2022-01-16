import API from './helper';

// User APIs

export const checkUserCode = (data) => API.post(`/admins/check-code/${data.userId}`, data);

export const updateProfile = (form) => API.post(`/admins/update-profile/${form.userId}`, form);

export const loadProfile = (userId) => API.get(`/admins/byId/${userId}`);

export const getUserByCode = (userCode) => API.get(`/admins/byCode/${userCode}`);
