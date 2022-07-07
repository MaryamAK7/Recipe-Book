import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { RecipeService } from "../RecipeService.service";
import { DataStorageService } from "../Shared/DataStorageService.service";

import { Recipe } from "./recipe.model";

@Injectable({providedIn:'root'})

export class RecipeResolverService implements Resolve<Recipe[]>{

        constructor(private dataStorageService : DataStorageService, private recipeService : RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
       const recipes = this.recipeService.getRecipes();
       if(recipes.length===0){
        return this.dataStorageService.fetchData();
       } else {
        return recipes;
       }
        
    }
    
}