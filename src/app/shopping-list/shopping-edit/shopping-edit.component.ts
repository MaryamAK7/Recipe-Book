import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/Shared/Ingredient.model';
import { ShoppingListService } from 'src/app/ShoppingListService.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {


  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit(): void {
  }
  addIngredient(nameInput:string,amountInput:string){
    this.shoppingService.addIngredient(new Ingredient(nameInput,Number(amountInput)))
  }
}
