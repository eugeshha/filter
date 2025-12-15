import { combineReducers } from 'redux';
import { servicesReducer } from './servicesReducer';
import { filterReducer } from './filterReducer';
import { formReducer } from './formReducer';

export const rootReducer = combineReducers({
  services: servicesReducer,
  filter: filterReducer,
  form: formReducer,
});
