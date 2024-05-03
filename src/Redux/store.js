
import { createStore} from 'redux';
import { rootReducer } from './Reducers/fetchReducer';

const store = createStore(rootReducer);

export default store;
