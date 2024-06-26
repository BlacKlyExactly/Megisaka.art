import Headline from '@/components/ui/typography/Headline';
import WorkShowcase from '@/components/work/WorkShowcase';
import { getImage } from '@/sanity/getImage';
import { fetchWorks } from '@/sanity/requests';
import { getTranslatedText } from '@/utils/getTranslatedText';
import { LanguagePageProps } from '@/utils/langPageProps';

const Portfolio = async ({ params: { lang } }: LanguagePageProps) => {
  const works = await fetchWorks();

  return (
    <main className="py-10 flex flex-col justify-center lg:gap-4 lg:pt-52">
      <Headline heading="h1" className="px-page-mobile lg:px-page">
        Portfolio
      </Headline>
      <WorkShowcase
        className="mt-10"
        works={works.map(({ title, image, type }) => ({
          title,
          type: getTranslatedText(type, lang),
          image: getImage(image, 612, 612),
        }))}
      />
    </main>
  );
};

export default Portfolio;
