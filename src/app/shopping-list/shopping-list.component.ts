import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../Shared/Ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes',10),

  ];

  constructor() { }

  ngOnInit(): void {
  }
  handleAddEvent(event:any){
    this.ingredients.push(new Ingredient(event.nameInput, event.amountInput))
  }

}
