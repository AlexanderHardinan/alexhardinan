'use client';
import RecipeBook from '@/components/RecipeBook';

export default function AllAboutPage() {
  return (
    <RecipeBook
      shelfKey="recipes:allabout"
      heading="All About"
      subtitle="Notes, foundations, preparations, and chef utilities."
    />
  );
}
