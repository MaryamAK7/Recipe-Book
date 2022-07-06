import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../Shared/Ingredient.model';
import { ShoppingListService } from '../ShoppingListService.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  subscription = new Subscription;

  ingredients!:Ingredient[];
  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscription = this.shoppingService.ingredientChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  
  onEditItem(index:number){
    this.shoppingService.startedEditing.next(index);
  }
}
