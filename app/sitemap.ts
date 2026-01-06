import type { MetadataRoute } from 'next';

const SITE = 'https://alexhardinan.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/stories-on-a-plate`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/in-the-glass`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/press-release`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE}/food-ethos`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE}/off-duty`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/description`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];

  // Blog slugs (kept in sync with your hardcoded posts)
  const blogSlugs = [
    'carrot-confidential',
    'sourcing-excellence',
    'balancing-technique',
    'the-global-palate',
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
