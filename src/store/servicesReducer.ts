import { nanoid } from 'nanoid';
import { ADD_SERVICE, UPDATE_SERVICE, DELETE_SERVICE } from './actions';
import type { ServicesState } from '../types';

const initialState: ServicesState = {
  items: [],
};

type ServicesAction =
  | { type: typeof ADD_SERVICE; payload: { name: string; price: number } }
  | { type: typeof UPDATE_SERVICE; payload: { id: string; name: string; price: number } }
  | { type: typeof DELETE_SERVICE; payload: { id: string } };

export const servicesReducer = (
  state = initialState,
  action: ServicesAction
): ServicesState => {
  switch (action.type) {
    case ADD_SERVICE:
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: nanoid(),
            name: action.payload.name,
            price: action.payload.price,
          },
        ],
      };

    case UPDATE_SERVICE:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                id: item.id,
                name: action.payload.name,
                price: action.payload.price,
              }
            : item
        ),
      };

    case DELETE_SERVICE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};
