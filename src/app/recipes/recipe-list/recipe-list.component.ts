import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[] = [
    new Recipe('A test Recipe','this is a simple test','../../../assets/Capture.PNG'),
    new Recipe('A test Recipe','this is a simple test','../../../assets/Capture.PNG')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
