export interface Recipe {
  recipe_id: string;
  recipe_name: string;
  recipe_description: string;
  recipe_image: string;
  recipe_nutrition: {
    calories: string;
    carbohydrate: string;
    fat: string;
    protein: string;
  };
  recipe_ingredients: {
    ingredient: string[];
  };
  recipe_types: {
    recipe_type: string[];
  };
}

interface Ingredient {
  food_name?: string;
  number_of_units?: number;
  measurement_description?: string;
}

interface Direction {
  direction_description: string;
}

export interface RecipeDetail extends Omit<Recipe, 'recipe_ingredients'> {
  ingredients: {
    ingredient: Ingredient[];
  };
  directions: {
    direction: Direction[];
  };
}
