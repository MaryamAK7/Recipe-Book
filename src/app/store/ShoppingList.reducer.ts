import { Ingredient } from '../Shared/Ingredient.model';
import * as SListReducer from './ShoppingList.actions';

export interface State {
  ingredients: Ingredient[];
  updatedIng: Ingredient;
  updatedIngInd: number;
}

export interface AppState {
  ShoppingList: State;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  updatedIng: null,
  updatedIngInd: -1,
};
export function ShoppingReducer(
  state = initialState,
  action: SListReducer.shoppingActions
) {
  switch (action.type) {
    case SListReducer.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case SListReducer.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case SListReducer.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.updatedIngInd];
      const updatedIng = {
        ...ingredient,
        ...action.payload,
      };
      const updatedIngs = [...state.ingredients];
      updatedIngs[state.updatedIngInd] = updatedIng;
      return {
        ...state,
        ingredients: updatedIngs,
        updatedIng: null,
        updatedIngInd: -1,
      };
    case SListReducer.DEL_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ing, index) => {
          index !== state.updatedIngInd;
        }),
        updatedIng: null,
        updatedIngInd: -1,
      };
    case SListReducer.START_EDIT:
      return {
        ...state,
        updatedIngInd: action.payload,
        updatedIng: { ...state.ingredients[action.payload] },
      };
    case SListReducer.STOP_EDIT:
      return {
        ...state,
        updatedIngInd: -1,
        updatedIng: null,
      };
    default:
      return state;
  }
}
