import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.sharmaelectronics.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'ClaudeBot', 'PerplexityBot'],
        allow: '/',
        disallow: ['/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
