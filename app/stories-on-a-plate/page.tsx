'use client';

import ImageCard from '../../components/ImageCard';

type Story = {
  src: string;
  caption: string;
};

export default function StoriesOnAPlate() {
  // ===== Edit images and captions here =====
  const stories: Story[] = [
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
    { src: '/stories/andaman-island.png', caption: 'Andaman Island — coconut water essence, cherry mousse, fresh berries, and kaffir lime cream within a fishbone tuile.' },
    { src: '/stories/applemint-granita.png', caption: 'Apple and Mint Granita — crafted as a refined interlude to refresh the palate.' },
    { src: '/stories/apple-slaw.png', caption: 'Green Apple Slaw Roll — pineapple, carrot, and red cabbage with a delicate yuzu cream.' },
    { src: '/stories/beetroot-elixir.png', caption: 'Beetroot Elixir — poached root and velouté in harmonious balance.' },
    { src: '/stories/bee-tuile.png', caption: 'Chiang Mai Honey Tuile — honey caviar, beetroot and mango gels, whipped feta.' },
    { src: '/stories/berries-millefuille.png', caption: 'Berries au Rouge Mille-Feuille — layers of crisp pastry and red berry crème.' },
    { src: '/stories/chef-dessert.png', caption: 'The Chef’s Signature Dessert — a silent expression of artistry and flavor.' },
    { src: '/stories/chicken-mansaf.png', caption: 'Modern Chicken Mansaf — tender poultry, jameed yogurt essence, aromatic rice, and nut medley.' },
    { src: '/stories/cold-cappellini.png', caption: 'Chilled Cappellini — akami tuna, sweet corn caviar, and refined umami balance.' },
    { src: '/stories/duck-breast.png', caption: 'Sous-Vide Duck Breast at 54°C for 120 Minutes, finished with Lychee Liqueur Reduction, Encapsulated Basil Oil, Roasted Pineapple, and Poached Beetroot.' },
    { src: '/stories/fig-mousse.png', caption: 'Fig Sawadee — fig mousse with chocolate soil, rich ganache, and mango gel.' },
    { src: '/stories/fisherman-chowder.png', caption: 'Fjords Fisherman’s Chowder — a rich Nordic soup with vegetable coulis, salmon, wild-caught cod, black cod oil, and ikura caviar.' },
    { src: '/stories/foie-gras.png', caption: 'Foie Gras Deluxe — perfectly seared and finished with a rich Lychee and Wine Reduction.' },
    { src: '/stories/forbidden-tree.png', caption: 'A Forbidden Tree — layered Coconut Sablé with Fresh Citrus, Chocolate Soil, and a Green Apple Crème Diplomat Quenelle, complemented by Italian Meringue and a Cherry filled with Passionfruit Ganache.' },
    { src: '/stories/forest-dessert.png', caption: 'Chocolate Log with Seasonal Fruit Mousse — white sponge and olive oil crumble.' },
    { src: '/stories/grouper-roulade.png', caption: 'Coconut–Tamarind Grouper Roulade — sous-vide at 50°C, served with Lemon and Apple-Fennel Slaw in Yuzu-Lemon Vinaigrette, finished with Mixed Citrus.' },
    { src: '/stories/heirloom-gazpacho.png', caption: 'Heirloom Tomato Essence — Chiang Mai inspiration, smoked shallot, butterfly pea gelée.' },
    { src: '/stories/honey-tuile.png', caption: 'Feta and Honey Composition — mango-beetroot gel, lemon tuile, lemongrass aroma.' },
    { src: '/stories/isaan-wagyu.png', caption: 'Wagyu Short Rib ‘Isaan’ — red curry glaze, baby corn, sticky rice tuile, tamarind reduction.' },
    { src: '/stories/kibbeh-deluxe.png', caption: 'Kibbeh de Luxe — Black Angus and foie gras filling, mint yogurt, Arabic spices, and nut textures.' },
    { src: '/stories/land-desertpasta.png', caption: 'The Land of Desert Pasta — house-made dual-color mega penne in rich Salona lamb sauce, complemented by Feta Mousse and the bold tang of Black Lemon.' },
    { src: '/stories/layered-chicken.png', caption: 'Masala Chicken and Apple Salad — spiced chicken, berries, toasted nuts, pineapple caviar, cucumber.' },
    { src: '/stories/mango-ceviche.png', caption: 'Nam Dok Mai Mango Ceviche — wild-caught barramundi with signature sauce, complemented by Young Coconut Espuma, Green Mango Ribbons, and a Crispy Tuile.' },
    { src: '/stories/mango-rice.png', caption: 'Mango and Sticky Rice Mille-Feuille — ripe mango layers, caramelized socarrat finish.' },
    { src: '/stories/mesa-postre.png', caption: 'Tableside Dessert Creation — ‘Mesa de Postre,’ an interactive showcase of flavor and artistry.' },
    { src: '/stories/pomelo-pearl.png', caption: 'Pomelo Pearl — lemongrass granita, lime caviar, compressed pomelo; a refreshing opening bite.' },
    { src: '/stories/pumpkin-veloute.png', caption: 'Northern Coconut Pumpkin Velouté — fresh coconut cream and silky Northern Thai pumpkin, garnished with pumpkin seeds and basil foam, presented in a natural coconut shell.' },
  ];
  // =================================

  return (
    <main className="container" style={{ padding: '2rem 0' }}>
      {/* PAGE HEADER */}
      <section className="page-header fade-up">
        <h1>
          <span style={{ color: '#CBA135' }}>Chef Alex Hardinan</span>
          <br />
          Stories on a Plate
        </h1>
        <p>Each dish tells a story — a memory, a moment, a passion captured in flavor.</p>
      </section>

      {/* IMAGE GRID */}
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
    </main>
  );
}
