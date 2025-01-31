export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  img_url?: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  img_url?: string;
  ingredients: Ingredient[];
  steps: string[];
  timeInMinutes: number;
}
