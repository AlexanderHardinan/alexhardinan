import ImageCard from '../../components/ImageCard';
import RevealOnScroll from '../../components/RevealOnScroll';

type Feature = {
  src: string;
  title: string;
  caption: string;
};

export default function OffDuty() {
  const features: Feature[] = [
    {
      src: '/offduty/photo1.png',
      title: 'The Eye Behind the Lens',
      caption:
        'Exploring the world through photography — capturing light, emotion, and fleeting stories one frame at a time.',
    },
    {
      src: '/offduty/photo2.png',
      title: 'The Global Traveler',
      caption:
        'Journeys across cities and cultures inspire not only my cuisine but my worldview — discovery beyond the kitchen.',
    },
    {
      src: '/offduty/photo3.png',
      title: 'The Sporting Spirit',
      caption:
        'Precision and discipline are not confined to the kitchen. Running, diving, and adventure sports fuel my balance and clarity.',
    },
    {
      src: '/offduty/photo4.png',
      title: 'Style & Expression',
      caption:
        'Fashion and form share rhythm with flavor. Off duty, I find creativity through design, tailoring, and timeless aesthetics.',
    },
  ];

  return (
    <RevealOnScroll>
      <main className="container" style={{ padding: '3rem 1rem' }}>
        <section className="fade-up" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 className="title">Off Duty</h1>
          <p className="subtitle">The world beyond the kitchen — where passion meets lifestyle.</p>
        </section>

        <section className="fade-up offduty-grid">
          {features.map((item, i) => (
            <div key={i} className="offduty-card">
              <div className="offduty-image">
                <ImageCard src={item.src} alt={item.title} />
              </div>
              <div className="offduty-text">
                <h2>{item.title}</h2>
                <p className="offduty-excerpt">{item.caption}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </RevealOnScroll>
  );
}
