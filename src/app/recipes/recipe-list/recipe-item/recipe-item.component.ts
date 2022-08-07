import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  animations: [
    trigger('list', [
      state(
        'in',
        style({
          opacity: 1,
          'background-color':'blue',
          transform: 'translateY(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-100px)',
        }),
        animate(400),
      ]),
      transition('* => void', [
        animate(
          200,
          style({
            opacity: 1,
            transform: 'translateY(-100px)',
          })
        ),
      ]),
    ]),
  ],
})
export class RecipeItemComponent implements OnInit {
@Input() recipe!:Recipe;
@Input() index!:number;
  ngOnInit(): void {
  }
 

}
