import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/Shared/Ingredient.model';
import { ShoppingListService } from 'src/app/ShoppingListService.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  subscription = new Subscription();
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingService.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingService.getIngredient(index);
      this.slForm.setValue({
        nameInput: this.editedItem.name,
        amountInput: this.editedItem.amount,
      });
    });
  }

  addIngredient(form: NgForm) {
    const newIng = new Ingredient(form.value.nameInput, form.value.amountInput);

    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex, newIng);
    } else {
      this.shoppingService.addIngredient(newIng);
    }
    this.editMode = false;
    form.reset();
  }
  deleteIngredient() {
    this.shoppingService.deleteIngredient( this.editedItemIndex)
    this.onClear();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
