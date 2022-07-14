import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/Shared/Ingredient.model';
import { ShoppingListService } from 'src/app/ShoppingListService.service';
import * as ShoppingListActions from '../../store/ShoppingList.actions';
import * as fromShoppingList from '../../store/ShoppingList.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  subscription = new Subscription();
  editMode = false;
  // editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(
    private shoppingService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('ShoppingList')
      .subscribe((stateData) => {
        if (stateData.updatedIngInd > -1) {
          this.editMode = true;
          this.editedItem = stateData.updatedIng;
          this.slForm.setValue({
            nameInput: this.editedItem.name,
            amountInput: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });

    //   this.shoppingService.startedEditing.subscribe((index) => {
    //   this.editMode = true;
    //   this.editedItemIndex = index;
    //   this.editedItem = this.shoppingService.getIngredient(index);
    //   this.slForm.setValue({
    //     nameInput: this.editedItem.name,
    //     amountInput: this.editedItem.amount,
    //   });
    // });
  }

  addIngredient(form: NgForm) {
    const newIng = new Ingredient(form.value.nameInput, form.value.amountInput);

    if (this.editMode) {
      // this.shoppingService.updateIngredient(this.editedItemIndex, newIng);
      this.store.dispatch(new ShoppingListActions.UpdateIng(newIng));
    } else {
      // this.shoppingService.addIngredient(newIng);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIng));
    }
    this.editMode = false;
    form.reset();
  }
  deleteIngredient() {
    this.store.dispatch(new ShoppingListActions.DeleteIng());

    // this.shoppingService.deleteIngredient( this.editedItemIndex)
    this.onClear();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
