import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipes/recipe.model";

@Injectable()
export class RecipeService {
  selectedRecipe = new EventEmitter<Recipe>();
  
    private recipes:Recipe[] = [
        new Recipe('A test Recipe1','this is a simple test','../../../assets/Capture.PNG'),
        new Recipe('A test Recipe2','this is a simple test','../../../assets/Capture.PNG')
      ];
      getRecipes(){
        return this.recipes.slice();
      }
    

}