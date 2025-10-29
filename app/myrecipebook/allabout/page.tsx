'use client';
import RecipeShelf from '../../../components/RecipeShelf';

export default function AllAboutPage() {
  return (
    <RecipeShelf
      storageNS="recipe:allabout"
      heading="All About"
      subtitle="Notes, foundations, preparations, and chef utilities."
    />
  );
}
