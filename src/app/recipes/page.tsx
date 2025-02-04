'use client';

import Sort, { SortOrder } from '@/components/custom/misc/sort';
import Filter from '@/components/custom/misc/filter';
import RecipeCard from '@/components/custom/recipe/card/recipe-card';
import { useState } from 'react';
import recipes from '@/data/recipe';
import { Recipe } from '@/lib/types/misc/recipe.interface';

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
    <div>
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        placeholder="Quantity"
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
    if (order === SortOrder.ASC) {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
};

export default function Recipes() {
    const [filteredRecipes, setFilteredRecipes] = useState(() => {
        return sortRecipes(recipes, SortOrder.ASC);
    });
    const [_, setSortOrder] = useState(SortOrder.ASC);

    const handleFormSubmit = (
        values: Record<string, string | number | null | undefined>,
    ) => {
        const { search, quantity } = values;

        let filtered = recipes;

        if (search) {
            const searchLower = search.toString().toLowerCase();
            filtered = filtered.filter(
                (recipe) =>
                    recipe.name.toLowerCase().includes(searchLower) ||
                    recipe.description.toLowerCase().includes(searchLower),
            );
        }

        if (quantity) {
            const quantityNumber = Number(quantity);
            if (!isNaN(quantityNumber)) {
                filtered = filtered.filter((recipe) =>
                    recipe.ingredients.some(
                        (ingredient) => ingredient.quantity >= quantityNumber,
                    ),
                );
            }
        }

        setFilteredRecipes(filtered);
    };

    const handleSortChange = (order: SortOrder) => {
        setSortOrder(order);
        const sortedRecipes = sortRecipes(filteredRecipes, order);
        setFilteredRecipes(sortedRecipes);
    };

    return (
        <>
            <div className="flex flex-col w-full justify-center p-3 mb-5">
                <div className="flex justify-between">
                    <Filter form={<MyForm />} onSubmit={handleFormSubmit} />
                    <Sort onSortChange={handleSortChange} />
                </div>
                {/* Grid für Rezepte mit dynamischen Spalten */}
                <div className="grid grid-cols-2 md:grid-cols-4 mt-8 gap-4 justify-items-center overflow-y-auto">
                    {filteredRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </>
    );
}

