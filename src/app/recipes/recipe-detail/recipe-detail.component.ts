import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/RecipeService.service';
import { Ingredient } from 'src/app/Shared/Ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
@Input() chosenRecipe:Recipe={name:'choose a recipe', description:'Recipe Description here', imagePath:'', ingredient:[]};

  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {
  }

  onAddToShoppingList(){
    this.recipeService.addToShoppingList(this.chosenRecipe.ingredient);
  }
 
}
