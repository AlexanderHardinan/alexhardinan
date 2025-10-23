'use client';
import RecipeShelf from '../../../components/RecipeShelf';
import { useRouter } from 'next/navigation';

export default function AllAboutPage() {
  const router = useRouter();

  return (
    <div style={{ paddingTop: '110px' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <button
          onClick={() => router.push('/myrecipebook')}
          style={{
            background: 'linear-gradient(90deg, #c59d5f, #d4af37)',
            color: 'white',
            border: 'none',
            padding: '10px 22px',
            fontSize: '0.95rem',
            borderRadius: '999px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              '0 4px 12px rgba(212,175,55,0.4)';
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          ← Back to My Recipe Book
        </button>
      </div>

      <RecipeShelf
        ns="recipe:allabout"
        heading="All About"
        subtitle="Notes, foundations, preparations, and chef utilities."
      />
    </div>
  );
}
