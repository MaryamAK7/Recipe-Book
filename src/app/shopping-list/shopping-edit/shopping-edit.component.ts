import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
@Output() addEvent = new EventEmitter<{nameInput:string,amountInput:number}>();
  constructor() { }

  ngOnInit(): void {
  }
  addIngredient(nameInput:string,amountInput:string){
    this.addEvent.emit({nameInput:nameInput, amountInput:Number(amountInput)});
  }
}
