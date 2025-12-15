import {
  SET_FORM_FIELD,
  START_EDITING,
  CANCEL_EDITING,
  CLEAR_FORM,
  SET_VALIDATION_ERROR,
} from './actions';
import type { FormState, Service } from '../types';

const initialState: FormState = {
  name: '',
  price: '',
  editingId: null,
  errors: {},
};

type FormAction =
  | { type: typeof SET_FORM_FIELD; payload: { field: 'name' | 'price'; value: string } }
  | { type: typeof START_EDITING; payload: { service: Service } }
  | { type: typeof CANCEL_EDITING }
  | { type: typeof CLEAR_FORM }
  | { type: typeof SET_VALIDATION_ERROR; payload: { field: string; error: string } };

export const formReducer = (state = initialState, action: FormAction): FormState => {
  switch (action.type) {
    case SET_FORM_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        errors: {
          ...state.errors,
          [action.payload.field]: undefined,
        },
      };

    case START_EDITING:
      return {
        ...state,
        name: action.payload.service.name,
        price: action.payload.service.price.toString(),
        editingId: action.payload.service.id,
        errors: {},
      };

    case CANCEL_EDITING:
    case CLEAR_FORM:
      return {
        name: '',
        price: '',
        editingId: null,
        errors: {},
      };

    case SET_VALIDATION_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.error,
        },
      };

    default:
      return state;
  }
};
