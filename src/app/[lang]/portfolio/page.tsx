import { Metadata } from 'next';

import WorkShowcase from '@/components/work/WorkShowcase';
import Main from '@/components/ui/section/Main';
import SectionContent from '@/components/ui/section/SectionContent';
import { getImage } from '@/lib/sanity/getImage';
import { fetchPortfolio, fetchWorks } from '@/lib/sanity/requests';
import { getTranslatedText } from '@/utils/getTranslatedText';
import { LanguagePageProps } from '@/utils/langPageProps';

export const metadata: Metadata = {
  title: 'Portfolio | Megisaka',
  description:
    'Explore the diverse portfolio of Megisaka, featuring stunning VTuber designs and various digital artworks. Witness the creativity and skill behind each unique piece.',
  keywords:
    'Megisaka portfolio, emotes, VTuber designs, streaming assets, digital art portfolio, concept art, fanart, loading screens, digital artist, Megisaka art',
};

const Portfolio = async ({ params: { lang } }: LanguagePageProps) => {
  const works = await fetchWorks();
  const portfolio = await fetchPortfolio();

  return (
    <Main>
      <SectionContent
        title={getTranslatedText(portfolio.title, lang)}
        heading="h1"
      >
        {getTranslatedText(portfolio.description, lang)}
      </SectionContent>
      <WorkShowcase
        className="mt-8 pb-24 lg:pb-0"
        works={works.map(({ title, image, type, slug }) => ({
          title,
          type: getTranslatedText(type, lang),
          image: getImage(image, 500, 500),
          alt: image.alt,
          slug,
          lqip: image.asset.metadata.lqip,
        }))}
      />
    </Main>
  );
};

export default Portfolio;
