import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output() navEvent = new EventEmitter<string>();
  location: string = '';
  constructor() {}

  ngOnInit(): void {}
  onNavRecipe() {
    this.navEvent.emit(this.location = "Recipe");
  }
  onNavShopping() {
    this.navEvent.emit(this.location = "Shopping");
  }
}
