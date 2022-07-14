import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterService } from "./Auth/auth-interceptor";
import { RecipeResolverService } from "./recipes/RecipesResolverService.service";
import { RecipeService } from "./RecipeService.service";
import { ShoppingListService } from "./ShoppingListService.service";

@NgModule({
    providers: [
        RecipeService,
        ShoppingListService,
        RecipeResolverService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterService, multi: true },
      ],
})
export class CoreModule{

}