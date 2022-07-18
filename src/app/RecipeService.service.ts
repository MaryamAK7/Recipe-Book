import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipes/recipe.model";
import { Ingredient } from "./Shared/Ingredient.model";
import { ShoppingListService } from "./ShoppingListService.service";

@Injectable()
export class RecipeService {
  
    recipeChanged = new Subject<Recipe[]>;

    constructor(private shoppingService: ShoppingListService){}
    private recipes:Recipe[] = [
        new Recipe('Chicken Escalop','Nostrud Lorem non exercitation anim labore dolore nostrud dolore. Ullamco in commodo non laborum exercitation qui laborum duis ut duis excepteur laboris labore deserunt. Non ullamco ea reprehenderit pariatur do nisi duis ipsum eiusmod anim.','../../../assets/chickenEscalop.jpg',[new Ingredient('chicken Breats', 1), new Ingredient('Fries',20), new Ingredient('Bread Crumps', 10)]),
        new Recipe('Beef Burger','Ut fugiat cillum amet laboris nostrud exercitation ad Lorem fugiat labore sit. Deserunt magna laboris minim sit sint elit dolore irure anim ad non est proident. Veniam voluptate sint aute esse nisi minim. Sit elit laboris deserunt ad adipisicing. In duis nisi nostrud dolor qui magna anim eiusmod exercitation. Cupidatat laborum nulla ullamco commodo. Ad et cillum proident consectetur sint officia.','../../../assets/burger.jpg',[new Ingredient('Buns',1), new Ingredient('Meat',2), new Ingredient('Tomato', 1), new Ingredient('letuce',1)])
      ];
    //  private recipes: Recipe[] = [];

      getRecipes(){
        return this.recipes.slice();
      }

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