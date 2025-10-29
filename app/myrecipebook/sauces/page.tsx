'use client';
import RecipeShelf from '../../../components/RecipeShelf';

export default function SaucesPage() {
  return (
    <RecipeShelf
      storageNS="recipe:sauces"
      heading="Sauces"
      subtitle="Mother sauces, emulsions, reductions, and finishing glazes."
    />
  );
}
