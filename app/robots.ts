import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/myrecipebook',          // private area (password gated)
        '/myrecipebook/',         // ensure trailing
        '/references',            // if this is protected content
        '/references/',           // trailing
      ],
    },
    sitemap: 'https://alexhardinan.com/sitemap.xml',
    host: 'https://alexhardinan.com',
  };
}
