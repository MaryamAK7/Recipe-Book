import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Auth/auth/auth.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path:'', redirectTo:"recipes", pathMatch: 'full'},
  {path:'shopping-list', component: ShoppingListComponent},
  {path:'auth', component:AuthComponent},
  {path:'recipes', component:RecipesComponent, children:[
    {path:'', component:RecipeStartComponent, pathMatch: "full"},
    {path:'new',component:EditRecipeComponent},
    {path:':id', component:RecipeDetailComponent},
    {path:":id/edit", component:EditRecipeComponent}
  ]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
