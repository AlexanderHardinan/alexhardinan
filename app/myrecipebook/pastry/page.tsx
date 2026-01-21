'use client';

import RecipeShelf from '../../../components/RecipeShelf';

export default function PastryPage() {
  return (
    <RecipeShelf
      storageNS="recipe:pastry"
      heading="Pastry & Bakery"
      subtitle="Cakes, tarts, viennoiserie, artisan breads, and fine desserts."
    />
  );
}
