import { Recipe } from '@/lib/types/misc/recipe.interface';
import styles from './recipe-card.module.css';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className={styles.recipeCard}>
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
