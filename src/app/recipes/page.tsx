'use client';

import { useState, useEffect } from 'react';
import { Recipe } from '@/lib/types/misc/recipe.interface';
import { getRecipes } from '@service/recipe';
import { getItems } from '@/service/item';

import Sort, { SortOrder } from '@/components/custom/misc/sort';
import Filter from '@/components/custom/misc/filter';
import RecipeCard from '@/components/custom/recipe/card/recipe-card';

const MyForm = () => (
  <>
    <div>
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search..."
        style={{
          width: '100%',
          padding: '8px',
          margin: '5px 0',
          boxSizing: 'border-box',
          border: '1px solid grey',
          borderRadius: '4px',
        }}
      />
    </div>
  </>
);

const sortRecipes = (recipes: Recipe[], order: SortOrder) => {
  return [...recipes].sort((a, b) => {
    return order === SortOrder.ASC
      ? a.recipe_name.localeCompare(b.recipe_name)
      : b.recipe_name.localeCompare(a.recipe_name);
  });
};

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [_, setSortOrder] = useState(SortOrder.ASC);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);

        const items = await getItems();
        const data = await getRecipes({
          search_expression: items.map((item) => item.name).join(';'),
        });

        setRecipes(data);
        setFilteredRecipes(sortRecipes(data, SortOrder.ASC));
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleFormSubmit = (
    values: Record<string, string | number | null | undefined>,
  ) => {
    const { search } = values;
    let filtered = [...recipes];

    if (search) {
      const searchLower = search.toString().toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.recipe_name.toLowerCase().includes(searchLower) ||
          recipe.recipe_description.toLowerCase().includes(searchLower),
      );
    }

    setFilteredRecipes(filtered);
  };

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
    setFilteredRecipes(sortRecipes(filteredRecipes, order));
  };

  return (
    <div className="flex flex-col w-full justify-center p-3 mb-5">
      <div className="flex justify-between">
        <Filter form={<MyForm />} onSubmit={handleFormSubmit} />
        <Sort onSortChange={handleSortChange} />
      </div>
      {isLoading ? (
        <p className="text-center mt-5">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 mt-8 gap-4 justify-items-center overflow-y-auto">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.recipe_id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
