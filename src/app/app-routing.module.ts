import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {path:'recipes', loadChildren: () => import('src/app/recipes/RecipesModule').then((m) => m.RecipesModule)},
  {path: 'auth', loadChildren: () => import('src/app/Auth/Auth.module').then((m) => m.AuthModule) },
  {path:'shopping-list',loadChildren: () => import('src/app/shopping-list/slist.module').then((m) => m.ShoppingListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' }) ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
