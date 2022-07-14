import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../Shared/Ingredient.model';
import { ShoppingListService } from '../ShoppingListService.service';
import * as fromShoppingList from '../store/ShoppingList.reducer'
import * as ShoppingListActions from '../store/ShoppingList.actions'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  //subscription = new Subscription;

  ingredients!:Ingredient[];
  // ingredients: Observable<{ingredients:Ingredient[]}>
  constructor(private shoppingService:ShoppingListService, private store : Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.store.select('ShoppingList').subscribe(stateData => this.ingredients = stateData.ingredients)

    //with service

    // this.ingredients = this.shoppingService.getIngredients();
    // this.subscription = this.shoppingService.ingredientChanged.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    // })
  }
  ngOnDestroy(): void {
      // this.subscription.unsubscribe();
  }
  
  onEditItem(index:number){
    // this.shoppingService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
}
