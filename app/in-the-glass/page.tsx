'use client';
import ImageCard from '../../components/ImageCard';

type Drink = {
  src: string;
  caption: string;
};

export default function InTheGlass() {
  // ===== Edit this array anytime =====
  const drinks: Drink[] = [
    { src: '/glass/americano-1.png', caption: 'A refreshing blend of Campari and Martini Rosso, topped with soda water and served over ice.' },
    { src: '/glass/emerald-yakuza.png', caption: 'Savor Japan with our Emerald Yakuza cocktail, a blend of premium sake, Roku gin, wasabi, and crisp apple. Each sip balances acidity and sweetness, finishing smoothlyPaired with Wagyu A5 Kagoshima tartare bites and dramatic dry ice, it immerses you in Japanese culinary artistry.' },
    { src: '/glass/espresso-martini.png', caption: 'A sophisticated blend of Bacardi white rum and Kahlua coffee liqueur, enhanced by a bold shot of espresso and luxurious cream.Topped with a layer of milk foam, this cocktail offers a delightful mix of coffee and spirit—perfect for an indulgent pick-me-up.' },
    { src: '/glass/french-75.png', caption: 'A refreshing twist on a classic, this French 75 features smooth Italian gin, zesty lime juice, and a touch of cane syrup, all topped with sparkling wine.' },
    { src: '/glass/green-sea.png', caption: 'Dive into the refreshing Green Sea Cocktail, featuring infused Bombay gin and crisp cucumber for a cool base. Fresh basil adds aromatic complexity, while zesty lime juice balances the flavors. Garnished with cucumber and basil, it offers a perfectly balanced, invigorating experience.' },
    { src: '/glass/habibi-come-to-dubai.png', caption: 'Experience the exotic Habibi Come to Dubai cocktail, a delightful fusion of infused Absolut vodka and aromatic cinnamon. Enhanced by the sweetness of Benedictine DOM and topped with a flambé of Sambuca on lime, this drink offers a luxurious journey of spice and celebration.' },
    { src: '/glass/harvey-wallbanger.png', caption: 'A vibrant cocktail that blends smooth Grey Goose vodka, aromatic Galliano, and fresh orange juice, served over ice for a refreshing finish.' },
    { src: '/glass/hidden-gem.png', caption: 'Discover the Hidden Gem Cocktail, a vibrant blend of Absolut vodka, banana liqueur, and Blue Curacao for a tropical hue. Lime juice and Campari add zest and bittersweet notes, while egg white gives a silky finish. Garnished uniquely, its truly a spectacle.' },
    { src: '/glass/irish-coffee.png', caption: 'Indulge in this rich Irish Coffee, crafted with smooth Jameson Irish whiskey, Kahlua coffee liqueur, and a bold double shot of espresso. Sweetened with brown sugar and crowned with creamy coconut and vanilla foam and a sprinkle of cinnamon, its a warming delight.' },
    { src: '/glass/martini-1.png', caption: 'A classic cocktail redefined, this Martini features crisp Hendricks Gin and dry Martini, perfectly chilled and garnished with green olives for a savory touch.' },
    { src: '/glass/middle-eastern-mojito.png', caption: 'Enjoy a Middle Eastern twist on the classic Mojito, combining Bacardi white rum with vanilla, cinnamon, and elderflower syrups. Muddled fresh mint, red grapes, and green apple complement zesty lime juice, topped with soda water and garnished with a lime wedge for a vibrant cocktail.' },
    { src: '/glass/negroni-1.png', caption: 'A timeless classic, the Negroni features Hendricks Gin, vibrant Campari, and smooth Martini Rosso, all stirred over ice for a perfect balance of bitter and sweet.' },
    { src: '/glass/old-fashioned.png', caption: 'A timeless classic, the Old Fashioned is a perfect blend of rich bourbon or rye whiskey, aromatic bitters, a touch of sugar, and a twist of citrus. Served over a large ice cube, this cocktail is garnished with an orange peel and a maraschino cherry, offering a smooth, balanced taste with hints of spice and sweetness. Its the quintessential choice for those who appreciate a simple, yet sophisticated drink.' },
    { src: '/glass/pinacolada-1.png', caption: 'A delightful mix of Bacardi white rum and Malibu rum combines with rich whipping cream and creamy coconut milk. Sweetened with cane syrup and brightened with fresh lime juice, its packed with fresh pineapple for a burst of flavor. Garnished with a fresh pineapple leaf and cherry.' },
    { src: '/glass/pink-rose.png', caption: 'A fragrant blend of botanicals, delicately sweet with balanced acidity and a refined medium spirit.' },
    { src: '/glass/spiced-blanco.png', caption: 'Enjoy the Spiced Blanco Cocktail, a vibrant blend of Tequila Don Julio Blanco and infused rosemary thyme syrup. Muddled ginger adds warmth, while lime juice provides refreshing acidity.' },
    { src: '/glass/the-boss.png', caption: 'Command attention with The Boss Cocktail, a bold blend of Woodford Reserve Rye Whiskey and Hennessy VSOP Cognac. Herbal depth from Benedictine DOM and bittersweet Campari, combined with infused Absolut Vodka and cinnamon, garnished with lemon peel and a cinnamon stick.' },
    { src: '/glass/tom-collins.png', caption: 'Enjoy a refreshing twist on the classic Tom Collins, featuring Harahorn gin, zesty lime juice, and sweet cane syrup. Served over crushed ice, this cocktail is light and invigorating, garnished with a slice of Japanese cucumber and a cherry for a delightful finish.' },
    { src: '/glass/tropical-pearl.png', caption: 'Escape to paradise with the Tropical Pearl Cocktail, featuring aged Bacardi Gold Rhum blended with Rose and Vanilla syrup for floral notes. Fresh lime juice adds zest, while pomegranate caviar bursts with flavor. Topped with airy milk air and garnished with edible flowers, its a captivating indulgence.' },
    { src: '/glass/watermelon-margarita.png', caption: 'Dive into the summer vibes with this refreshing Watermelon Margarita! Crafted with smooth Don Julio Blanco tequila and zesty Cointreau, it features watermelon syrup and fresh lime juice for a deliciously fruity twist. This cocktail is half-rimmed with a mix of salt and chili powder for a perfect balance of sweet and spicy.' },
    { src: '/glass/whiskey-sour.png', caption: 'Indulge in a delightful Whiskey Sour featuring smooth Jim Beam bourbon whiskey, zesty lime juice, and a touch of yuzu syrup for a unique twist. Whipped to perfection with egg white and a pinch of cream of tartar, this cocktail is beautifully frothy. Garnished with fresh orange and a cherry, it offers a refreshing balance of sweet and sour.' },
    { src: '/glass/white-cadillac.png', caption: 'Indulge in the luxurious White Cadillac, a vibrant blend of Galliano yellow and cacao white, elegantly swirled with rich whipping cream. Topped with a delicate dusting of ground cinnamon and adorned with an edible flower, this cocktail is a sophisticatedcelebration of flavors that will transport you to a sun-soaked paradise. Perfectly balanced and visually stunning.' },
    // continue to drink40.png later
    // { src: '/glass/drink6.png', caption: '...' },
  ];
  // ==================================

  return (
    <main className="container" style={{ padding: '2rem 0' }}>
      <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="title">In the Glass</h1>
        <p className="subtitle">
          Every pour tells a story — precision, balance, and the pursuit of sensory harmony.
        </p>
      </section>

      <section>
        <div className="stories-grid">
          {drinks.map((item, i) => (
            <div key={i} className="story-card">
              <ImageCard src={item.src} alt={`Drink ${i + 1}`} />
              <p className="story-caption">{item.caption}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
