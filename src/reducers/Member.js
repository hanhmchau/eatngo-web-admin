const getCurrentUser = () => {
	const json = localStorage.getItem('user');
	if (json) {
		return JSON.parse(json);
	}
};

const initialSettings = {
	currentUser: getCurrentUser()
};

const settings = (state = initialSettings, action) => {
	switch (action.type) {
		case 'LOGIN':
		case 'REGISTER':
			return {
				...state,
				error: false,
				currentUser: action.user
			};
		case 'LOGIN_ERROR':
			return {
				...state,
				currentUser: undefined,
				error: true
			};
		case 'LOGOUT':
			return {
				...state,
				currentUser: undefined,
				error: false
			};
		default:
			return state;
	}
};

export default settings;
