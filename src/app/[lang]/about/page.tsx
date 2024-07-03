import { PortableText } from '@portabletext/react';
import Main from '@/components/ui/section/Main';
import Headline from '@/components/ui/typography/Headline';
import { fetchAbout } from '@/lib/sanity/requests';
import { getTranslatedText } from '@/utils/getTranslatedText';
import { LanguagePageProps } from '@/utils/langPageProps';
import { cn } from '@/utils/cn';
import { textVariants } from '@/components/ui/typography/Text';

const About = async ({ params: { lang } }: LanguagePageProps) => {
  const { title, contentEn, contentPl } = await fetchAbout();

  const currentBlock = lang === 'pl' ? contentPl : contentEn;

  return (
    <Main
      className={cn(
        'px-page-mobile lg:px-page [&_ul]:!list-[inherit] [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:lg:gap-0 [&_ul]:list-inside [&_strong]:text-crimson [&_strong]:!font-bold',
        textVariants({ size: 'main' }),
      )}
    >
      <Headline heading="h1">{getTranslatedText(title, lang)}</Headline>
      <div className="flex flex-col pb-24 gap-6 mt-6 lg:mt-12 lg:pb-0">
        <PortableText
          value={currentBlock}
          components={{
            block: {
              h2: ({ children }) => (
                <Headline heading="h2">{children}</Headline>
              ),
              h3: ({ children }) => (
                <Headline heading="h3">{children}</Headline>
              ),
            },
          }}
        />
      </div>
    </Main>
  );
};

export default About;
