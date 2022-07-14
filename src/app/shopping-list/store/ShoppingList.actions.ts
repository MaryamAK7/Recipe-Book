import { Action } from "@ngrx/store";
import { Ingredient } from "../../Shared/Ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS'
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT'
export const DEL_INGREDIENT = 'DEL_INGREDIENT'
export const START_EDIT = 'START_EDIT'
export const STOP_EDIT = 'STOP_EDIT'

export class AddIngredient implements Action {
    constructor(public payload: Ingredient){}
 readonly type = ADD_INGREDIENT;

}
export class AddIngredients implements Action {
    constructor(public payload: Ingredient[]){}
 readonly type = ADD_INGREDIENTS;

}

export class DeleteIng implements Action {
    constructor(){}
 readonly type = DEL_INGREDIENT;

}
export class UpdateIng implements Action {
    constructor(public payload: Ingredient){}
 readonly type = UPDATE_INGREDIENT;

}
export class StartEdit implements Action {
    constructor(public payload: number){}
 readonly type = START_EDIT;
}
export class StopEdit implements Action {
    constructor(){}
 readonly type = STOP_EDIT;
}

export type shoppingActions = AddIngredient | AddIngredients | DeleteIng | UpdateIng | StartEdit | StopEdit ;