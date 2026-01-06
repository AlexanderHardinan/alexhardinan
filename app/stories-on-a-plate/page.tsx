import ImageCard from '../../components/ImageCard';
import RevealOnScroll from '../../components/RevealOnScroll';
import Link from 'next/link';

type Story = {
  src: string;
  caption: string;
};

export default function StoriesOnAPlate() {
  const stories: Story[] = [
    { src: '/stories/rossini-nordic.png', caption: 'Nordic Rossini - a5 kagoshima tenderloin paired with cubed seared foie gras, cloudberry jus, butternut squash and edamame puree, syrah caviar, charred leek base.' },
    { src: '/stories/root-winter.png', caption: 'Winter Root Veloute - turnip and potato veloute, brown butter crumble, fresh black truffles.' },
    { src: '/stories/alaskan-crab.png', caption: 'Alaskan King Crab Leg - poached alaskan king crab, kaffir lime emulsion, white miso, kani salad.' },
    { src: '/stories/gravlax-mosaic.png', caption: 'Gravlax Mosaic - 3 days cured wild caught Norwegian salmon in green mango and dill, Norwegian brown goat cheese, poached beetroot sheet, pineapple caviar and dill mayo.' },
    { src: '/stories/chef-chef.png', caption: 'The Visionary Encounters - 2 starred Michelin Collaboration.' },
    { src: '/stories/bruschetta-pouch.png', caption: 'Amuse Bouche - a playful bruschetta on fita bread pouch, activated charcoal, tomato caviar, pineapple, onion, tomato, cilanro, basil and sprouts.' },
    { src: '/stories/bites-nordic.png', caption: 'Nordic Opening Bites - gravlax salmon, crispy salmon skin puff, mini medister.' },
    { src: '/stories/heirloom-veloute.png', caption: 'Seasonal Veloute - winter vegetables refined into a silky veloute, poached carrot with feta cheese mousse, roasted pepitas, crispy sweet basil.' },
    { src: '/stories/michelin-palate.png', caption: 'Roselle Sherbet.' },
    { src: '/stories/michelin-banner.png', caption: 'The Michelin Dinner - 12 course collaboration.' },
    { src: '/stories/closing-bites.png', caption: 'Closing Bites - irish coffee jelly, baileys cream sphere, citrus basket, lemon confit.' },
    { src: '/stories/carrot-confidential.png', caption: 'Carrot Confidential - carrot cappellini, carrot sphere, carrot caviar, carrot crème, carrot roll, carrot oil crumble, carrot jelly, carrot glaze, carrot tuile.' },

    { src: '/stories/thai-ravioli.png', caption: 'Thai Blue Crab Ravioli — inspired by seasonal ingredients in Thailand, Chef’s Table: Winter Edition III.' },
    { src: '/stories/thai-rissoto.png', caption: 'Khao Hom Mali risotto — jasmine rice reinterpretation of the classic risotto.' },
    { src: '/stories/tiramisu-sphere.png', caption: 'Tiramisu Reimagined — from classic to sphere.' },
    { src: '/stories/truffle-pasta.png', caption: 'Truffle royale pasta.' },
    { src: '/stories/vegan-tartare.png', caption: 'When vegan meets tartare.' },
    { src: '/stories/tenderloin-butternut.png', caption: 'Wagyu Tenderloin with beef jus and butternut purée.' },
    { src: '/stories/san-sebastian.png', caption: 'Basque-Style San Sebastián Cheesecake with Seasonal Berries.' },
    { src: '/stories/salmon-kal.png', caption: 'Kal-Wrapped Norwegian Salmon — dill-turmeric emulsion, mixed citrus, tapioca crisp.' },
    { src: '/stories/roselle-bonzai.png', caption: 'Roselle Sorbet Bonsai — a playful ode to nature in dessert form.' },
    { src: '/stories/riverprawn-aurora.png', caption: 'Ayutthaya River Prawn — coconut-poached with Thai herbs, lemongrass essence, mango sphere, pineapple caviar, and compressed pomelo.' },
    { src: '/stories/a5-tartare.png', caption: 'Kagoshima A5 Tartare — Himalayan salt presentation, paired with artisanal corn bread.' },
    { src: '/stories/a5-tataki.png', caption: 'Applewood-Smoked A5 Tataki — shiso wrap, yuzu truffle glaze.' },
    { src: '/stories/american-pie.png', caption: 'Vol-au-Vent of Figs and Orange Marmalade — topped with a cream-filled cocktail apple.' },
    { src: '/stories/andaman-island.png', caption: 'Andaman Island — coconut water essence, cherry mousse, fresh berries, kaffir lime cream within a fishbone tuile.' },
    { src: '/stories/applemint-granita.png', caption: 'Apple and Mint Granita — crafted as a refined interlude to refresh the palate.' },
    { src: '/stories/apple-slaw.png', caption: 'Green Apple Slaw Roll — pineapple, carrot, red cabbage with a delicate yuzu cream.' },
    { src: '/stories/beetroot-elixir.png', caption: 'Beetroot Elixir — poached root and velouté in harmonious balance.' },
    { src: '/stories/bee-tuile.png', caption: 'Chiang Mai Honey Tuile — honey caviar, beetroot and mango gels, whipped feta.' },
    { src: '/stories/berries-millefuille.png', caption: 'Berries au Rouge Mille-Feuille — layers of crisp pastry and red berry crème.' },
    { src: '/stories/chef-dessert.png', caption: 'The Chef’s Signature Dessert — a silent expression of artistry and flavor.' },
    { src: '/stories/chicken-mansaf.png', caption: 'Modern Chicken Mansaf — tender poultry, jameed yogurt essence, aromatic rice, nut medley.' },
    { src: '/stories/cold-cappellini.png', caption: 'Chilled Cappellini — akami tuna, sweet corn caviar, refined umami balance.' },
    { src: '/stories/duck-breast.png', caption: 'Sous-Vide Duck Breast at 54°C for 120 Minutes, Lychee Liqueur Reduction, Basil Oil, Roasted Pineapple, Beetroot.' },
    { src: '/stories/fig-mousse.png', caption: 'Fig Sawadee — fig mousse with chocolate soil, ganache, mango gel.' },
    { src: '/stories/fisherman-chowder.png', caption: 'Fjords Fisherman’s Chowder — Nordic soup with vegetable coulis, salmon, cod, black cod oil, ikura.' },
    { src: '/stories/foie-gras.png', caption: 'Foie Gras Deluxe — perfectly seared with Lychee and Wine Reduction.' },
    { src: '/stories/forbidden-tree.png', caption: 'A Forbidden Tree — Coconut Sablé, Citrus, Chocolate Soil, Apple Crème Diplomat.' },
    { src: '/stories/forest-dessert.png', caption: 'Chocolate Log with Seasonal Fruit Mousse — white sponge and olive oil crumble.' },
    { src: '/stories/grouper-roulade.png', caption: 'Coconut–Tamarind Grouper Roulade — sous-vide, lemon slaw, citrus finish.' },
    { src: '/stories/heirloom-gazpacho.png', caption: 'Heirloom Tomato Essence — Chiang Mai inspiration, smoked shallot, butterfly pea gelée.' },
    { src: '/stories/honey-tuile.png', caption: 'Feta and Honey Composition — mango-beet gel, lemon tuile, lemongrass aroma.' },
    { src: '/stories/isaan-wagyu.png', caption: 'Wagyu Short Rib “Isaan” — red curry glaze, baby corn, sticky rice tuile.' },
    { src: '/stories/kibbeh-deluxe.png', caption: 'Kibbeh de Luxe — Black Angus, foie gras, mint yogurt, Arabic spices.' },
    { src: '/stories/land-desertpasta.png', caption: 'The Land of Desert Pasta — dual-color mega penne, lamb sauce, feta mousse, black lemon.' },
    { src: '/stories/layered-chicken.png', caption: 'Masala Chicken and Apple Salad — berries, toasted nuts, pineapple caviar.' },
    { src: '/stories/mango-ceviche.png', caption: 'Nam Dok Mai Mango Ceviche — barramundi, coconut espuma, crispy tuile.' },
    { src: '/stories/mango-rice.png', caption: 'Mango Sticky Rice Mille-Feuille — caramelized socarrat finish.' },
    { src: '/stories/mesa-postre.png', caption: 'Mesa de Postre — tableside interactive dessert showcase.' },
    { src: '/stories/pomelo-pearl.png', caption: 'Pomelo Pearl — lemongrass granita, lime caviar, compressed pomelo.' },
    { src: '/stories/pumpkin-veloute.png', caption: 'Northern Coconut Pumpkin Velouté — coconut cream, Thai pumpkin, basil foam.' },
  ];

  return (
    <RevealOnScroll>
      <main className="container" style={{ padding: '2rem 0' }}>
        <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="title">Stories on a Plate</h1>
          <p className="subtitle">
            Each dish tells a story — a memory, a moment, a passion captured in flavor.
          </p>
        </section>

        <section>
          <div className="stories-grid">
            {stories.map((item, i) => (
              <div key={i} className="story-card">
                <ImageCard src={item.src} alt={`Story ${i + 1}`} />
                <p className="story-caption">{item.caption}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="explore-block fade-up">
          <h3 className="explore-block__title">Explore</h3>
          <div className="explore-block__links">
            <Link className="btn btn--primary btn--sm" href="/blog">
              Culinary Journal →
            </Link>
            <Link className="btn btn--ghost btn--sm" href="/in-the-glass">
              In the Glass →
            </Link>
            <Link className="btn btn--ghost btn--sm" href="/food-ethos">
              Food Ethos →
            </Link>
            <Link className="btn btn--ghost btn--sm" href="/off-duty">
              Off Duty →
            </Link>
          </div>
        </section>
      </main>
    </RevealOnScroll>
  );
}
