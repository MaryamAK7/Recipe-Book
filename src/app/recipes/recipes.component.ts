import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../RecipeService.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
 
  constructor(private recipeService :RecipeService, private route:ActivatedRoute) {
  }

  ngOnInit(): void {
  }
  
}
