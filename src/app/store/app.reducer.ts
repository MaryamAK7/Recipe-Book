import * as fromShoppingList from '../shopping-list/store/ShoppingList.reducer'
import * as fromAuth from '../Auth/store/auth.reducer'
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
  }
export const appReducer:ActionReducerMap<AppState> = {
    shoppingList : fromShoppingList.ShoppingReducer,
    auth: fromAuth.AuthReducer
}
