'use server';

import { BaseService } from '@lib/common';
import { Recipe, RecipeDetail } from '@/lib/types/misc/recipe.interface';

export interface RecipeFilter {
  search_expression?: string;
  recipe_id?: string;
}

interface FatSecterResponse {
  recipes: {
    recipe: Recipe[];
  };
}

interface FatSecretDetailResponse {
  recipe: RecipeDetail;
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

  public async getRecipe(search?: RecipeFilter) {
    const response = await this.httpClient.post<FatSecretDetailResponse>(
      `${this.endpoint}/detail`,
      search,
      true,
    );

    return response.recipe;
  }
}

export const getRecipes = async (search?: RecipeFilter) => {
  return RecipeService.getInstance().getRecipes(search);
};

export const getRecipe = async (search?: RecipeFilter) => {
  return RecipeService.getInstance().getRecipe(search);
};
