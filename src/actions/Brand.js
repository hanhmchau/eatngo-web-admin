import { URL } from '../constants/Api';

export function toggleCollapsedNav(isNavCollapsed) {
	return { type: TOGGLE_COLLAPSED_NAV, isNavCollapsed };
}

export const loadBrand = id => dispatch => {
	fetch(`${URL}/brands/${id}`)
		.then(result => result.json())
		.then(brand => {
			dispatch({
				type: 'LOAD_BRAND',
				brand
			});
		});
};
const returnBrands = brands => ({
	type: 'RETURN_BRANDS',
	brands
});

export const loadBrands = memberId => {
	return dispatch => {
		return fetch(`${URL}/members/${memberId}/brands`)
			.then(result => result.json())
			.then(brands => {
				dispatch(returnBrands(brands));
			});
	};
};

const _deleteBrands = id => ({
	type: 'DELETE_BRAND',
	id
});

export const deleteBrands = id => {
	return dispatch => {
		return fetch(`${URL}/brands/${id}`, {
			method: 'DELETE'
		}).then(result => {
			dispatch(_deleteBrands(brands));
		});
	};
};

export const updateBrand = brand => dispatch => {
	fetch(`${URL}/brands/${brand.id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(brand)
	}).then(result => {
		dispatch({
			type: 'LOAD_BRAND',
			brand
		});
	});
};

export const updateBrandInternally = brand => dispatch => {
	dispatch({
		type: 'LOAD_BRAND',
		brand
	});
};

export const createBrand = ({ brand, history }) => dispatch => {
	fetch(`${URL}/brands`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(brand)
	})
		.then(result => result.json())
		.then(result => {
			history.push(`/dashboard/brand/${result.id}`);
		});
};

export const deleteStore = id => {
	return dispatch => {
		return fetch(`${URL}/stores/${id}`, {
			method: 'DELETE'
		}).then(result => {
			dispatch({
				type: 'DELETE_STORE',
				id
			});
		});
	};
};

export const addStore = store => {
	return dispatch => {
		return fetch(`${URL}/stores`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(store)
		})
			.then(result => result.json())
			.then(result => {
				store.id = result.id;
				dispatch({
					type: 'ADD_STORE',
					store
				});
			});
	};
};

export const updateStore = store => {
	return dispatch => {
		return fetch(`${URL}/stores/${store.id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(store)
		}).then(result => {
			dispatch({
				type: 'UPDATE_STORE',
				store
			});
		});
	};
};

export const updateStoreInternally = store => {
	return dispatch => {
		dispatch({
			type: 'UPDATE_STORE',
			store
		});
	};
};

export const addFood = food => {
	return dispatch => {
		return fetch(`${URL}/foods`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(food)
		})
			.then(result => result.json())
			.then(result => {
				dispatch({
					type: 'ADD_FOOD',
					food: result
				});
			});
	};
};

export const deleteFood = id => {
	return dispatch => {
		return fetch(`${URL}/foods/${id}`, {
			method: 'DELETE'
		}).then(result => {
			dispatch({
				type: 'DELETE_FOOD',
				id
			});
		});
	};
};

export const loadFood = id => dispatch => {
	fetch(`${URL}/foods/${id}`)
		.then(result => result.json())
		.then(food => {
			dispatch({
				type: 'LOAD_FOOD',
				food
			});
		});
};

export const loadFoodTypes = () => dispatch => {
	fetch(`${URL}/food-types`)
		.then(result => result.json())
		.then(foodTypes => {
			dispatch({
				type: 'LOAD_FOOD_TYPES',
				foodTypes
			});
		});
};

export const updateFood = food => {
	return dispatch => {
		return fetch(`${URL}/foods/${food.id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(food)
		}).then(result => {
			dispatch({
				type: 'LOAD_FOOD',
				food
			});
		});
	};
};

export const updateFoodInternally = food => {
	return dispatch => {
		dispatch({
			type: 'LOAD_FOOD',
			food
		});
	};
};

export const addFoodImage = (food, image) => {
	return dispatch => {
		return fetch(`${URL}/foods/${food.id}/images`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				image
			})
		}).then(result => {
			dispatch({
				type: 'ADD_FOOD_IMAGE',
				image
			});
		});
	};
};

export const deleteFoodImage = (food, image) => {
	return dispatch => {
		return fetch(`${URL}/foods/${food.id}/images`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				image
			})
		}).then(result => {
			dispatch({
				type: 'DELETE_FOOD_IMAGE',
				image
			});
		});
	};
};
