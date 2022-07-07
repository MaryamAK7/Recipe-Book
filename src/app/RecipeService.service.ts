import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipes/recipe.model";
import { Ingredient } from "./Shared/Ingredient.model";
import { ShoppingListService } from "./ShoppingListService.service";

@Injectable()
export class RecipeService {
  
    recipeChanged = new Subject<Recipe[]>;

    // private recipes:Recipe[] = [
    //     new Recipe('Chicken Escalop','this is a simple test','../../../assets/chickenEscalop.jpg',[new Ingredient('chicken Breats', 1), new Ingredient('Fries',20), new Ingredient('Bread Crumps', 10)]),
    //     new Recipe('Beef Burger','this is a simple test','../../../assets/burger.jpg',[new Ingredient('Buns',1), new Ingredient('Meat',2), new Ingredient('Tomato', 1), new Ingredient('letuce',1)])
    //   ];
    private recipes: Recipe[] = [];
      getRecipes(){
        return this.recipes.slice();
      }
     constructor(private shoppingService: ShoppingListService){}

     setRecipes(recipes: Recipe[]){
      this.recipes = recipes;
      this.recipeChanged.next(this.recipes.slice())
    }
      addToShoppingList(ingredients:Ingredient[]){
        this.shoppingService.addIngredients(ingredients);
      }
      getRecipe(index:number){
        return this.recipes[index];
      }
      updateRecipe(index:number, newRecipe : Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }
      addRecipe(recipe : Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }
      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
      }
}