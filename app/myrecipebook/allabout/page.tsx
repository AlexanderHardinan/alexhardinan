'use client';
import RecipeEditor from '@/components/RecipeEditor';

export default function AllAboutPage() {
  return (
    <RecipeEditor
      storageKey="recipe:allabout"
      heading="All About"
      subtitle="Notes, foundations, preparations, and chef utilities."
    />
  );
}
