import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard-pages/', '/api/', '/_next/'],
      },
    ],
    sitemap: 'https://jogadorpro.vercel.app/sitemap.xml',
  }
}
