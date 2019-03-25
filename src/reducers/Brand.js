const initialSettings = {
	brands: [],
	activeBrand: {},
	activeFood: {
		images: [],
		type: {}
	}
};

const settings = (state = initialSettings, action) => {
	switch (action.type) {
		case 'RETURN_BRANDS':
			const newState = {
				...state,
				brands: action.brands
			};
			return newState;
		case 'DELETE_BRAND':
			return {
				...state,
				brands: state.brands.filter(b => b.id !== action.id)
			};
		case 'LOAD_BRAND':
			return {
				...state,
				activeBrand: action.brand
			};
		case 'DELETE_STORE':
			return {
				...state,
				activeBrand: {
					...state.activeBrand,
					stores: state.activeBrand.stores
						.filter(s => s.id !== action.id)
						.map(s => ({
							...s
						}))
				}
			};
		case 'ADD_STORE':
			return {
				...state,
				activeBrand: {
					...state.activeBrand,
					stores: [...state.activeBrand.stores, action.store].sort(
						(a, b) => a.id - b.id
					)
				}
			};
		case 'UPDATE_STORE':
			const updatedStores = state.activeBrand.stores
				.map(s => (s.id === action.store.id ? action.store : s))
				.sort((a, b) => a.id - b.id);
			return {
				...state,
				activeBrand: {
					...state.activeBrand,
					stores: updatedStores
				}
			};
		case 'ADD_FOOD':
			const currentList = (state.activeBrand.foods || []);
			const foodList = [...currentList, action.food].sort(
				(a, b) => a.id - b.id
			);
			return {
				...state,
				activeBrand: {
					...state.activeBrand,
					foods: foodList
				}
			};
		case 'DELETE_FOOD':
			return {
				...state,
				activeBrand: {
					...state.activeBrand,
					foods: state.activeBrand.foods.filter(s => s.id !== action.id)
				}
			};
		case 'LOAD_FOOD':
			return {
				...state,
				activeFood: action.food
			};
		case 'LOAD_FOOD_TYPES':
			return {
				...state,
				foodTypes: action.foodTypes
			};
		case 'ADD_FOOD_IMAGE':
			return {
				...state,
				activeFood: {
					...state.activeFood,
					images: [
						...state.activeFood.images,
						{
							foodId: state.activeFood.id,
							image: action.image
						}
					]
				}
			};
		case 'DELETE_FOOD_IMAGE':
			return {
				...state,
				activeFood: {
					...state.activeFood,
					images: state.activeFood.images.filter(img => img.image !== action.image)
				}
			};
		default:
			return state;
	}
};

export default settings;
