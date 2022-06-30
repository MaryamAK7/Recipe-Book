import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/RecipeService.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  chosenRecipe:Recipe=this.recipeService.chosenRecipe;

  constructor(private recipeService:RecipeService) { 
    console.log(this.recipeService.chosenRecipe)
  }

  ngOnInit(): void {
  }
 
}
