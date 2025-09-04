import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10)
    ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    let found = false;
    for (let element of this.ingredients) {
      if (element.name === ingredient.name) {
        element.amount += ingredient.amount;
        found = true;
        break;
      };
    };
    if (!found) {
      this.ingredients.push({...ingredient});
    };
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let element of ingredients) {
      this.addIngredient(element);
    };
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    let found = false;
    for (let element of this.ingredients) {
      if (element.name === newIngredient.name) {
        element.amount += newIngredient.amount;
        this.ingredients.splice(index,1);
        found = true;
        break;
      };
    };
    if (!found) {
      this.ingredients[index] = newIngredient;
    };
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
