'use client';

import { Recipe } from '@/lib/types/misc/recipe.interface';
import styles from './recipe-card.module.css';
import { useRouter } from 'next/navigation';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter();

  const handleRecipeClick = () => {
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <div onClick={handleRecipeClick} className={styles.recipeCard}>
      <div className={styles.imageContainer}>
        <img src={recipe.img_url} alt={recipe.name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <p className={styles.description}>{recipe.name}</p>
        <div className={styles.footer}>
          <span className={styles.footerText}>{recipe.timeInMinutes} min.</span>
        </div>
      </div>
    </div>
  );
}
