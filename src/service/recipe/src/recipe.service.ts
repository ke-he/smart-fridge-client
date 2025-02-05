'use server';

import { BaseService } from '@lib/common';
import { Recipe } from '@/lib/types/misc/recipe.interface';

export interface RecipeFilter {
  search_expression?: string;
}

interface FatSecterResponse {
  recipes: {
    recipe: Recipe[];
  };
}

class RecipeService extends BaseService {
  private static instance: RecipeService;

  private constructor() {
    super('/recipe');
  }

  public static getInstance(): RecipeService {
    if (!RecipeService.instance) {
      RecipeService.instance = new RecipeService();
    }
    return RecipeService.instance;
  }

  public async getRecipes(search?: RecipeFilter) {
    const response = await this.httpClient.post<FatSecterResponse>(
      `${this.endpoint}/search`,
      search,
      false,
    );

    return response.recipes.recipe;
  }
}

export const getRecipes = async (search?: RecipeFilter) => {
  return RecipeService.getInstance().getRecipes(search);
};
