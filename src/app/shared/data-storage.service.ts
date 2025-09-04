import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://ng-course-recipe-book-184dd-default-rtdb.firebaseio.com/recipes.json',
      recipes
    )
    .subscribe((response) => {
      console.log(response)
    });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-184dd-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }


}
