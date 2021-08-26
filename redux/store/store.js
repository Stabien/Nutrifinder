import { createStore, combineReducers } from 'redux';
import currentResearchReducer from '../reducers/currentResearchReducer.js';
import productFiltersReducer from '../reducers/productFiltersReducer';

const reducers = combineReducers({
  currentResearch: currentResearchReducer,
  productFilters: productFiltersReducer
});

export default createStore(reducers);
