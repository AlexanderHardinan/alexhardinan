'use client';

import ImageCard from '../../components/ImageCard';

type Drink = {
  src: string;
  caption: string;
};

export default function InTheGlass() {
  const drinks: Drink[] = [
    { src: '/glass/americano-1.png', caption: 'A refreshing blend of Campari and Martini Rosso, topped with soda water and served over ice.' },
    { src: '/glass/emerald-yakuza.png', caption: 'Savor Japan with our Emerald Yakuza cocktail, a blend of premium sake, Roku gin, wasabi, and crisp apple. Each sip balances acidity and sweetness, finishing smoothly. Paired with Wagyu A5 Kagoshima tartare bites and dramatic dry ice, it immerses you in Japanese culinary artistry.' },
    { src: '/glass/espresso-martini.png', caption: 'A sophisticated blend of Bacardi white rum and Kahlua coffee liqueur, enhanced by a bold shot of espresso and luxurious cream. Topped with a layer of milk foam, this cocktail offers a delightful mix of coffee and spirit—perfect for an indulgent pick-me-up.' },
    { src: '/glass/french-75.png', caption: 'A refreshing twist on a classic, this French 75 features smooth Italian gin, zesty lime juice, and a touch of cane syrup, all topped with sparkling wine.' },
    { src: '/glass/green-sea.png', caption: 'Dive into the refreshing Green Sea Cocktail, featuring infused Bombay gin and crisp cucumber for a cool base. Fresh basil adds aromatic complexity, while zesty lime juice balances the flavors. Garnished with cucumber and basil, it offers a perfectly balanced, invigorating experience.' },
    { src: '/glass/habibi-come-to-dubai.png', caption: 'Experience the exotic Habibi Come to Dubai cocktail, a delightful fusion of infused Absolut vodka and aromatic cinnamon. Enhanced by the sweetness of Benedictine DOM and topped with a flambé of Sambuca on lime, this drink offers a luxurious journey of spice and celebration.' },
    { src: '/glass/harvey-wallbanger.png', caption: 'A vibrant cocktail that blends smooth Grey Goose vodka, aromatic Galliano, and fresh orange juice, served over ice for a refreshing finish.' },
    { src: '/glass/hidden-gem.png', caption: 'Discover the Hidden Gem Cocktail, a vibrant blend of Absolut vodka, banana liqueur, and Blue Curacao for a tropical hue. Lime juice and Campari add zest and bittersweet notes, while egg white gives a silky finish. Garnished uniquely, it’s truly a spectacle.' },
    { src: '/glass/irish-coffee.png', caption: 'Indulge in this rich Irish Coffee, crafted with smooth Jameson Irish whiskey, Kahlua coffee liqueur, and a bold double shot of espresso. Sweetened with brown sugar and crowned with creamy coconut and vanilla foam and a sprinkle of cinnamon, it’s a warming delight.' },
    { src: '/glass/martini-1.png', caption: 'A classic cocktail redefined, this Martini features crisp Hendricks Gin and dry Martini, perfectly chilled and garnished with green olives for a savory touch.' },
    { src: '/glass/middle-eastern-mojito.png', caption: 'Enjoy a Middle Eastern twist on the classic Mojito, combining Bacardi white rum with vanilla, cinnamon, and elderflower syrups. Muddled fresh mint, red grapes, and green apple complement zesty lime juice, topped with soda water and garnished with a lime wedge for a vibrant cocktail.' },
    { src: '/glass/negroni-1.png', caption: 'A timeless classic, the Negroni features Hendricks Gin, vibrant Campari, and smooth Martini Rosso, all stirred over ice for a perfect balance of bitter and sweet.' },
    { src: '/glass/old-fashioned.png', caption: 'A timeless classic, the Old Fashioned is a perfect blend of rich bourbon or rye whiskey, aromatic bitters, a touch of sugar, and a twist of citrus.' },
    { src: '/glass/pinacolada-1.png', caption: 'A delightful mix of Bacardi white rum and Malibu rum combines with rich whipping cream and creamy coconut milk, brightened with fresh pineapple.' },
    { src: '/glass/pink-rose.png', caption: 'A fragrant blend of botanicals, delicately sweet with balanced acidity and a refined medium spirit.' },
    { src: '/glass/spiced-blanco.png', caption: 'Enjoy the Spiced Blanco Cocktail, a vibrant blend of Tequila Don Julio Blanco and infused rosemary thyme syrup, lifted by ginger and lime.' },
    { src: '/glass/the-boss.png', caption: 'Command attention with The Boss Cocktail, a bold blend of Woodford Reserve Rye Whiskey and Hennessy VSOP Cognac, layered with herbal and bittersweet depth.' },
    { src: '/glass/tom-collins.png', caption: 'A refreshing twist on the classic Tom Collins, featuring Harahorn gin, zesty lime juice, and sweet cane syrup over crushed ice.' },
    { src: '/glass/tropical-pearl.png', caption: 'Escape to paradise with the Tropical Pearl Cocktail, featuring aged Bacardi Gold Rhum with floral rose and vanilla notes.' },
    { src: '/glass/watermelon-margarita.png', caption: 'A refreshing Watermelon Margarita crafted with Don Julio Blanco tequila, Cointreau, and fresh lime juice, half-rimmed with salt and chili.' },
    { src: '/glass/whiskey-sour.png', caption: 'A refined Whiskey Sour featuring Jim Beam bourbon, yuzu syrup, lime juice, and a silky egg-white foam.' },
    { src: '/glass/white-cadillac.png', caption: 'The White Cadillac blends Galliano yellow and cacao white with rich cream and cinnamon for a luxurious finish.' },
  ];

  return (
    <main className="container page-light-header" style={{ padding: '2rem 0' }}>
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
