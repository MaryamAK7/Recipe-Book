import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/RecipeService.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;
  editedRecipe!: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
      this.id = +params['id'];
    });
    this.initForm();
  }

  onSubmit() {
    
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
      
    } else {
      this.recipeService.addRecipe(newRecipe);
      
    }
    this.router.navigate(['../'], { relativeTo: this.route });
   
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  private initForm() {
    let recipeName: string = '';
    let recipeDesc: string = '';
    let recipeImg: string = '';
    let recipeIngredient: FormArray = new FormArray([]);

    if (this.editMode) {
      let editedRecipe = this.recipeService.getRecipe(this.id);

      recipeName = editedRecipe.name;
      recipeDesc = editedRecipe.description;
      recipeImg = editedRecipe.imagePath;
      if (editedRecipe['ingredients']) {
        for (let ing of editedRecipe.ingredients) {
          (<FormArray>recipeIngredient).push(
            new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amount: new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[0-9]+[1-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      imagePath: new FormControl(recipeImg, Validators.required),
      ingredients: recipeIngredient,
    });
  }
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onAddIngredients() {
    (<FormArray>this.recipeForm.get('ingredients'))?.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[0-9]+[1-9]*$/),
        ]),
      })
    );
  }
  onDeleteIngredient(i:number){
   (<FormArray> this.recipeForm.get('ingredients')).removeAt(i);
  }
}
