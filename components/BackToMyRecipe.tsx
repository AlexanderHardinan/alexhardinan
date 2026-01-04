'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function BackToMyRecipe() {
  const pathname = usePathname();
  const router = useRouter();

  // Hide on the main page itself
  if (pathname === '/myrecipebook') return null;

  return (
    <div className="myrecipebook-backwrap">
      <button
        type="button"
        className="btn myrecipebook-backbtn"
        onClick={() => router.push('/myrecipebook')}
        aria-label="Back to My Recipe"
      >
        ← Back to My Recipe
      </button>
    </div>
  );
}
