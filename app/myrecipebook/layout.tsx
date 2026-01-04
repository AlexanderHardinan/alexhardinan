import BackToMyRecipe from '../../components/BackToMyRecipe';

export default function MyRecipeBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackToMyRecipe />
      {children}
    </>
  );
}
