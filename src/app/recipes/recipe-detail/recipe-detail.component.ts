import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecipeService } from 'src/app/RecipeService.service';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  chosenRecipe!: Recipe;

  isCanceled:boolean = false;
  id!: number;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService:NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.chosenRecipe = this.recipeService.getRecipe(this.id);
      
    });

  }

  onAddToShoppingList() {
    this.recipeService.addToShoppingList(this.chosenRecipe.ingredients);
    this.router.navigate(['shopping-list']);
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteRecipe(content) {
    this.openSm(content)
  }
  openSm(content){
    this.modalService.open(content, {size:'lg'});
  }
  onYesModal(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
