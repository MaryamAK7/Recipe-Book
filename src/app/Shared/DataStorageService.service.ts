import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../RecipeService.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveData() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipe-book-a936f-default-rtdb.firebaseio.com/recipes.json',

        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchData() {
    return this.http
      .get<Recipe[]>(

        'https://recipe-book-a936f-default-rtdb.firebaseio.com/recipes.json'

      )
      .pipe(
        map((response) => {
          return response.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }), tap(
            (response) => {this.recipeService.setRecipes(response);}
        )
      )
  }
}