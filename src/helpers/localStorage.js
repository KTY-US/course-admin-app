export const getUserInformationFromStorage = () => {
	return JSON.parse(localStorage.getItem('profile'));
};

export const saveUserInformationToStorage = (profile) => {
	localStorage.setItem('profile', JSON.stringify(profile));
};

export const deleteUserInformationFromStorage = () => {
	localStorage.removeItem('profile');
};
