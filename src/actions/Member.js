import { URL } from '../constants/Api';

export function toggleCollapsedNav(isNavCollapsed) {
	return { type: TOGGLE_COLLAPSED_NAV, isNavCollapsed };
}

export const login = (phoneNumber, facebookId) => dispatch => {
	fetch(`${URL}/members/authorize`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			phoneNumber,
			facebookId
		})
	})
		.then(result => result.json())
		.then(user => {
			if (user.error) {
				dispatch({
					type: 'LOGIN_ERROR'
				});
				return;
			}
			if (user) localStorage.setItem('user', JSON.stringify(user));
			dispatch({
				type: 'LOGIN',
				user
			});
		})
		.catch(err => {});
};

export const register = (email, name, phoneNumber, facebookId) => dispatch => {
	fetch(`${URL}/members`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			name,
			phoneNumber,
			facebookId
		})
	})
		.then(result => result.json())
		.then(user => {
			localStorage.setItem('user', JSON.stringify(user));
			dispatch({
				type: 'REGISTER',
				user
			});
		});
};

export const logout = () => dispatch => {
	localStorage.removeItem('user');
	dispatch({
		type: 'LOGOUT'
	});
};
