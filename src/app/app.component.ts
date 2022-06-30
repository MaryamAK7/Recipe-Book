import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navigate:string = "Recipe";

  title = 'angularProject';
  onNavigation(location:string){
    this.navigate = location;
  }
}
