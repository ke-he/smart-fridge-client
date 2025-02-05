'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RecipeDetail as Detail } from '@/lib/types/misc/recipe.interface';
import CustomButton from '@/components/custom/misc/button/custom-button';
import { getRecipe } from '@/service/recipe';

export default function RecipeDetail() {
  const { recipeId } = useParams();
  const router = useRouter();

  const [recipe, setRecipe] = useState<Detail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        const data = await getRecipe({ recipe_id: recipeId as string });
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (isLoading || !recipe)
    return <div className="flex justify-center my-4">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{recipe.recipe_name}</h1>
      <img
        src={recipe.recipe_image || '/placeholder.png'}
        alt={recipe.recipe_name}
        className="w-full h-48 object-cover rounded-lg my-4"
      />
      <p className="text-lg">{recipe.recipe_description}</p>
      <h2 className="text-xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc pl-5">
        {recipe.ingredients?.ingredient.map((ingredient) => (
          <li key={ingredient.food_name}>
            {ingredient.number_of_units} {ingredient.measurement_description}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-6">Instructions</h2>
      <p className="whitespace-pre-line">
        <ul className="list-disc pl-5">
          {recipe.directions?.direction.map((direction, i) => (
            <li key={i}>{direction.direction_description}</li>
          ))}
        </ul>
      </p>
      <CustomButton className="my-4" onClick={() => router.push('/recipes')}>
        Back to Recipes
      </CustomButton>
    </div>
  );
}
