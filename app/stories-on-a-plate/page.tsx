'use client';

import dynamic from 'next/dynamic';

const ImageCard = dynamic(() => import('../../components/ImageCard'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '250px',
        background: '#f2f2f2',
        borderRadius: '12px',
      }}
    />
  ),
});

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
    // (rest unchanged)
  ];

  return (
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
    </main>
  );
}
