import { fetchWorks } from '@/lib/sanity/requests';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await fetchWorks();

  return [
    ...works.map(({ slug, _createdAt }) => ({
      url: `https://megisaka.art/portfolio/${slug}`,
      lastModified: _createdAt,
      alternates: {
        languages: {
          en: `https://megisaka.art/en/portfolio/${slug}`,
          pl: `https://megisaka.art/pl/portfolio/${slug}`,
        },
      },
    })),
    {
      url: 'https://megisaka.art',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://megisaka.art/en',
          pl: 'https://megisaka.art/pl',
        },
      },
    },
    {
      url: 'https://megisaka.art/portfolio',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://megisaka.art/en/portfolio',
          pl: 'https://megisaka.art/pl/portfolio',
        },
      },
    },
    {
      url: 'https://megisaka.art/commissions',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://megisaka.art/en/commissions',
          pl: 'https://megisaka.art/pl/commissions',
        },
      },
    },
    {
      url: 'https://megisaka.art/about',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://megisaka.art/en/about',
          pl: 'https://megisaka.art/pl/about',
        },
      },
    },
    {
      url: 'https://megisaka.art/contact',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://megisaka.art/en/contact',
          pl: 'https://megisaka.art/pl/contact',
        },
      },
    },
    {
      url: 'https://megisaka.art/tos',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://megisaka.art/en/tos',
          pl: 'https://megisaka.art/pl/tos',
        },
      },
    },
  ];
}
