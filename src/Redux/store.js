import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { rootReducer } from './Reducers/fetchReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
