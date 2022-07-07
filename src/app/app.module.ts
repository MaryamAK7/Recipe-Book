import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { HeaderComponent } from './header/header.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { DropdownDirective } from './Shared/dropdown.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeService } from './RecipeService.service';
import { ShoppingListService } from './ShoppingListService.service';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { AuthComponent } from './Auth/auth/auth.component';
import { LoadingComponent } from './Shared/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeListComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    HeaderComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    DropdownDirective,
    RecipeStartComponent,
    EditRecipeComponent,
    AuthComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RecipeService,ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
