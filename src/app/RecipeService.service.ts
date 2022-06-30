import { Injectable } from "@angular/core";
import { Recipe } from "./recipes/recipe.model";

@Injectable()
export class RecipeService {
    recipes:Recipe[] = [
        new Recipe('A test Recipe1','this is a simple test','../../../assets/Capture.PNG'),
        new Recipe('A test Recipe2','this is a simple test','../../../assets/Capture.PNG')
      ];

      chosenRecipe:Recipe = {name:"testRecipe", description:"testDesc", imagePath:""};

}