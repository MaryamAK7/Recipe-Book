import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[] = [
    new Recipe('A test Recipe1','this is a simple test','../../../assets/Capture.PNG'),
    new Recipe('A test Recipe2','this is a simple test','../../../assets/Capture.PNG')
  ];
  @Output() recipeEvent = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }
  onClickRecipe(recipe:Recipe){
    this.recipeEvent.emit(recipe);
  }

}
