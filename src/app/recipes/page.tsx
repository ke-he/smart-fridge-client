'use client';

import Sort from '@/components/custom/misc/sort';
import Filter from '@/components/custom/misc/filter';
import { Recipe } from '@/lib/types/misc/recipe.interface';
import RecipeCard from '@/components/custom/recipe/card/recipe-card';

const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    description: 'A classic and delicious dish perfect for any occasion.',
    img_url: 'https://via.placeholder.com/300?text=Spaghetti+Carbonara',
    ingredients: [
      {
        id: 1,
        name: 'Spaghetti',
        quantity: 200,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Spaghetti',
      },
      {
        id: 2,
        name: 'Eggs',
        quantity: 3,
        unit: 'piece',
        img_url: 'https://via.placeholder.com/150?text=Eggs',
      },
      {
        id: 3,
        name: 'Parmesan',
        quantity: 50,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Parmesan',
      },
      {
        id: 4,
        name: 'Bacon',
        quantity: 100,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Bacon',
      },
      {
        id: 5,
        name: 'Salt',
        quantity: 1,
        unit: 'tsp',
        img_url: 'https://via.placeholder.com/150?text=Salt',
      },
    ],
    steps: [
      'Boil spaghetti until al dente.',
      'Cook bacon in a pan until crispy.',
      'Mix eggs and Parmesan in a bowl.',
      'Combine everything with the cooked spaghetti.',
      'Serve immediately.',
    ],
    timeInMinutes: 30,
  },
  {
    id: 2,
    name: 'Tomato Basil Soup',
    description: 'Rich and hearty flavors to warm you up.',
    img_url: 'https://via.placeholder.com/300?text=Tomato+Basil+Soup',
    ingredients: [
      {
        id: 6,
        name: 'Tomatoes',
        quantity: 5,
        unit: 'piece',
        img_url: 'https://via.placeholder.com/150?text=Tomatoes',
      },
      {
        id: 7,
        name: 'Basil',
        quantity: 10,
        unit: 'leaves',
        img_url: 'https://via.placeholder.com/150?text=Basil',
      },
      {
        id: 8,
        name: 'Garlic',
        quantity: 3,
        unit: 'cloves',
        img_url: 'https://via.placeholder.com/150?text=Garlic',
      },
      {
        id: 9,
        name: 'Onion',
        quantity: 1,
        unit: 'piece',
        img_url: 'https://via.placeholder.com/150?text=Onion',
      },
      {
        id: 10,
        name: 'Olive Oil',
        quantity: 2,
        unit: 'tbsp',
        img_url: 'https://via.placeholder.com/150?text=Olive+Oil',
      },
    ],
    steps: [
      'Sauté garlic and onion in olive oil.',
      'Add chopped tomatoes and cook until soft.',
      'Blend the mixture until smooth.',
      'Add basil leaves and simmer for 10 minutes.',
      'Serve hot with bread.',
    ],
    timeInMinutes: 25,
  },
  {
    id: 3,
    name: 'Mushroom Risotto',
    description: 'A savory meal that will leave everyone satisfied.',
    img_url: 'https://via.placeholder.com/300?text=Mushroom+Risotto',
    ingredients: [
      {
        id: 11,
        name: 'Rice',
        quantity: 300,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Rice',
      },
      {
        id: 12,
        name: 'Mushrooms',
        quantity: 200,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Mushrooms',
      },
      {
        id: 13,
        name: 'Chicken Broth',
        quantity: 1,
        unit: 'L',
        img_url: 'https://via.placeholder.com/150?text=Chicken+Broth',
      },
      {
        id: 14,
        name: 'Parmesan',
        quantity: 50,
        unit: 'g',
        img_url: 'https://via.placeholder.com/150?text=Parmesan',
      },
      {
        id: 15,
        name: 'Butter',
        quantity: 2,
        unit: 'tbsp',
        img_url: 'https://via.placeholder.com/150?text=Butter',
      },
    ],
    steps: [
      'Sauté mushrooms in butter until golden brown.',
      'Add rice and stir until coated.',
      'Gradually add chicken broth, stirring frequently.',
      'Cook until rice is creamy and tender.',
      'Stir in Parmesan and serve.',
    ],
    timeInMinutes: 40,
  },
  // Add 7 more recipes following the same pattern
  {
    id: 4,
    name: 'Grilled Chicken Salad',
    description: 'A healthy and refreshing meal.',
    img_url: 'https://via.placeholder.com/300?text=Grilled+Chicken+Salad',
    ingredients: [
      {
        id: 16,
        name: 'Chicken Breast',
        quantity: 2,
        unit: 'pieces',
        img_url: 'https://via.placeholder.com/150?text=Chicken+Breast',
      },
      {
        id: 17,
        name: 'Lettuce',
        quantity: 1,
        unit: 'head',
        img_url: 'https://via.placeholder.com/150?text=Lettuce',
      },
      {
        id: 18,
        name: 'Tomatoes',
        quantity: 2,
        unit: 'pieces',
        img_url: 'https://via.placeholder.com/150?text=Tomatoes',
      },
      {
        id: 19,
        name: 'Cucumber',
        quantity: 1,
        unit: 'piece',
        img_url: 'https://via.placeholder.com/150?text=Cucumber',
      },
      {
        id: 20,
        name: 'Olive Oil',
        quantity: 2,
        unit: 'tbsp',
        img_url: 'https://via.placeholder.com/150?text=Olive+Oil',
      },
    ],
    steps: [
      'Grill chicken breast until fully cooked.',
      'Chop vegetables and combine in a bowl.',
      'Slice the grilled chicken and add to the salad.',
      'Drizzle olive oil and mix well.',
      'Serve immediately.',
    ],
    timeInMinutes: 20,
  },
];

export default function Recipes() {
  return (
    <>
      <div className="flex flex-col w-100 justify-center p-3 mb-5">
        <div className="flex justify-between">
          <Sort />
          <Filter />
        </div>
        <div className="grid grid-cols-2 mt-8 gap-4 justify-items-center overflow-y-auto">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
}
