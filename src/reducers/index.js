import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import Settings from './Settings';
import Brands from './Brand';
import Members from './Member';


const reducers = combineReducers({
    routing: routerReducer,
    settings: Settings,
    brands: Brands,
    members: Members
});

export default reducers;
