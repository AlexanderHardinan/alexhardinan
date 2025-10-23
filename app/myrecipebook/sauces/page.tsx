'use client';
import RecipeEditor from '../../../components/RecipeEditor';

export default function SaucesPage() {
  return (
    <RecipeEditor
      storageKey="recipe:sauces"
      heading="Sauces"
      subtitle="Emulsions, reductions, and pure culinary craft."
    />
  );
}
