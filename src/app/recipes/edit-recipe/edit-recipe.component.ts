import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
id!:number;
editMode:boolean=false;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) =>
    { this.editMode = params['id'] !=null;
      this.id = +params['id']
      console.log(this.editMode)
    })
  }

}
