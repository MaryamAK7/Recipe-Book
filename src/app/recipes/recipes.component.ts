import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../RecipeService.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  recipe: Recipe = this.recipeService.chosenRecipe ;
  constructor(private recipeService :RecipeService) {
  }

  ngOnInit(): void {
    console.log(this.recipe);
  }
  
}
