export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  img_url?: string;
}

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
