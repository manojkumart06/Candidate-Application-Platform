import { combineReducers } from 'redux';

import {
  SET_FILTERS,
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
} from '../Actions/fetchAction'

const initialState = {
  filters: {},
  jobs: [],
  loading: false,
  error: null,
};

const filtersReducer = (state = initialState.filters, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return action.payload;
    default:
      return state;
  }
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_REQUEST:
      return { ...state, loading: true };
    case FETCH_JOBS_SUCCESS:
      return { ...state, loading: false,
         jobs:[...state.jobs, ...action.payload]};
    case FETCH_JOBS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// combine the reducer functions here
export const rootReducer = combineReducers({
  filters: filtersReducer,
  jobs: jobsReducer,
});
