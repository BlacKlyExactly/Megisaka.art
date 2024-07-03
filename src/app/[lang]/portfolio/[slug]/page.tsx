import Image from 'next/image';
import { redirect } from 'next/navigation';
import { PortableText } from 'next-sanity';

import PortfolioData from '@/components/portfolio/PortfolioData';
import Main from '@/components/ui/section/Main';
import Headline from '@/components/ui/typography/Headline';
import { textVariants } from '@/components/ui/typography/Text';
import Sprinkles from '@/components/ui/decorations/Sprinkles';
import SectionContent from '@/components/ui/section/SectionContent';
import Gallery from '@/components/portfolio/Gallery';
import Description from '@/components/portfolio/Description';
import { fetchWork, fetchWorkSeo } from '@/lib/sanity/requests';
import { getImage } from '@/lib/sanity/getImage';
import { getTranslatedText } from '@/utils/getTranslatedText';
import { LanguagePageProps } from '@/utils/langPageProps';
import { cn } from '@/utils/cn';

export const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  if (!slug) return {};

  const { title, description, image } = await fetchWorkSeo(slug);

  const imageUrl = getImage(image, 500, 500);

  return {
    title: `${title} | Megisaka Art`,
    description: description.en,
    openGraph: {
      images: [imageUrl],
    },
  };
};

const dictionary = {
  type: {
    en: 'Type',
    pl: 'Rodzaj',
  },
  programs: {
    en: 'Programs used',
    pl: 'Użyte programy',
  },
  realizationTime: {
    en: 'Realization time',
    pl: 'Czas realizacji',
  },
};

const PortfolioWork = async ({
  params: { lang, slug },
}: LanguagePageProps & { params: { slug?: string } }) => {
  if (!slug) redirect('/portfolio');

  const work = await fetchWork(slug);

  if (!work) redirect('/portfolio');

  const {
    title,
    type,
    description,
    gallery,
    realizationTime,
    programs,
    showcaseEn,
    showcasePl,
  } = work;

  const currentBlock = lang === 'pl' ? showcasePl : showcaseEn;

  return (
    <Main className="px-page-mobile lg:px-page pb-24" as="div">
      <header>
        <div className="flex-col flex lg:flex-row lg:justify-between lg:gap-7">
          <SectionContent title={title} heading="h1" className="!px-0" />
          <Description>{getTranslatedText(description, lang)}</Description>
        </div>
        <div className="flex flex-col gap-4 mt-8 lg:mt-20 lg:flex-row relative">
          <Sprinkles className="absolute -z-10 -right-1/4 top-[80%] hidden lg:block" />
          <PortfolioData
            title={getTranslatedText(dictionary.type, lang)}
            value={getTranslatedText(type, lang)}
          />
          <PortfolioData
            title={getTranslatedText(dictionary.programs, lang)}
            value={programs}
          />
          <PortfolioData
            title={getTranslatedText(dictionary.realizationTime, lang)}
            value={getTranslatedText(realizationTime, lang)}
          />
        </div>
      </header>
      <main className="mt-16 lg:mt-32 ">
        <Gallery
          gallery={gallery.map((img) => ({
            alt: img.alt,
            width: 500,
            height: 500,
            src: getImage(img, 500, 500),
            lqip: img.asset.metadata.lqip,
          }))}
        />
        {currentBlock && (
          <div
            className={cn(
              'flex flex-col gap-6 mt-8 lg:mt-32 [&_ul]:!list-[inherit] [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:lg:gap-0 [&_ul]:list-inside [&_strong]:text-crimson [&_strong]:!font-bold',
              textVariants({ size: 'main' }),
            )}
          >
            <PortableText
              value={currentBlock}
              components={{
                block: {
                  h2: ({ children }) => (
                    <Headline heading="h2">{children}</Headline>
                  ),
                },
                types: {
                  image: ({ value }) =>
                    value.link ? (
                      <a href={value.link} className="w-fit">
                        <Image
                          src={getImage(value, value.width, value.height)}
                          alt={value.alt}
                          width={value.width}
                          height={value.height}
                        />
                      </a>
                    ) : (
                      <Image
                        src={getImage(value, value.width, value.height)}
                        alt={value.alt}
                        width={value.width}
                        height={value.height}
                      />
                    ),
                },
              }}
            />
          </div>
        )}
      </main>
    </Main>
  );
};

export default PortfolioWork;
