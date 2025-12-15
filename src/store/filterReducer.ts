import { SET_SEARCH_TERM, CLEAR_SEARCH } from './actions';
import type { FilterState } from '../types';

const initialState: FilterState = {
  searchTerm: '',
};

type FilterAction =
  | { type: typeof SET_SEARCH_TERM; payload: { searchTerm: string } }
  | { type: typeof CLEAR_SEARCH };

export const filterReducer = (state = initialState, action: FilterAction): FilterState => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        searchTerm: '',
      };

    default:
      return state;
  }
};
