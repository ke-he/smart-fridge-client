'use client';

import { Recipe } from '@/lib/types/misc/recipe.interface';
import styles from './recipe-card.module.css';
import { useRouter } from 'next/navigation';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter();

  const handleRecipeClick = () => {
    router.push(`/recipes/${recipe.recipe_id}`);
  };

  return (
    <div onClick={handleRecipeClick} className={styles.recipeCard}>
      <div className={styles.imageContainer}>
        <img
          src={recipe.recipe_image || '/placeholder.png'}
          alt={recipe.recipe_name}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.description}>{recipe.recipe_description}</p>
        <div className={styles.footer}>
          <span className={styles.footerText}>
            {Math.floor(Math.random() * (60 - 20 + 1)) + 20} min.
          </span>
        </div>
      </div>
    </div>
  );
}
