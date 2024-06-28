import { Metadata } from 'next';

import WorkShowcase from '@/components/work/WorkShowcase';
import Main from '@/components/ui/section/Main';
import Headline from '@/components/ui/typography/Headline';
import { getImage } from '@/lib/sanity/getImage';
import { fetchWorks } from '@/lib/sanity/requests';
import { getTranslatedText } from '@/utils/getTranslatedText';
import { LanguagePageProps } from '@/utils/langPageProps';

export const metadata: Metadata = {
  title: 'Portfolio | Megisaka Art',
  description:
    'Explore the diverse portfolio of Megisaka, featuring stunning VTuber designs and various digital artworks. Witness the creativity and skill behind each unique piece.',
  keywords:
    'Megisaka portfolio, VTuber designs, digital art portfolio, VTuber creations, Megisaka Art, digital artist portfolio, unique digital art, VTuber gallery',
};

const Portfolio = async ({ params: { lang } }: LanguagePageProps) => {
  const works = await fetchWorks();

  return (
    <Main>
      <Headline heading="h1" className="px-page-mobile lg:px-page">
        Portfolio
      </Headline>
      <WorkShowcase
        className="mt-8 pb-24 lg:pb-0"
        works={works.map(({ title, image, type }) => ({
          title,
          type: getTranslatedText(type, lang),
          image: getImage(image, 612, 612),
          alt: image.alt,
        }))}
      />
    </Main>
  );
};

export default Portfolio;
