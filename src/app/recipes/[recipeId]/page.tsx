'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import recipes from '@/data/recipe';
import { Recipe } from '@/lib/types/misc/recipe.interface';
import CustomButton from '@/components/custom/misc/button/custom-button';
import Image from 'next/image';

export default function RecipeDetail() {
  const { recipeId } = useParams();
  const router = useRouter();

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (recipeId) {
      const foundRecipe = recipes.find(
        (r) => String(r.id) === String(recipeId),
      );
      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        router.replace('/404');
      }
    }
  }, [recipeId, router]);

  if (!recipe) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{recipe.name}</h1>
      <Image
        width={200}
        height={200}
        src={recipe.img_url || '/placeholder.png'}
        alt={recipe.name}
        className="w-full h-48 object-cover rounded-lg my-4"
      />
      <p className="text-lg">{recipe.description}</p>

      <h2 className="text-xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc pl-5">
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.name}>
            {ingredient.quantity} {ingredient.unit} - {ingredient.name}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Instructions</h2>
      <p className="whitespace-pre-line">{'test instruction'}</p>

      <CustomButton onClick={() => router.push('/recipes')}>
        Back to Recipes
      </CustomButton>
    </div>
  );
}
