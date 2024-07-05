import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';

import Main from '@/components/ui/section/Main';
import Headline from '@/components/ui/typography/Headline';
import { textVariants } from '@/components/ui/typography/Text';
import { fetchTos } from '@/lib/sanity/requests';
import { LanguagePageProps } from '@/utils/langPageProps';
import { cn } from '@/utils/cn';

export const metadata: Metadata = {
  title: 'Terms of Service | Megisaka',
  description:
    'Read the Terms of Service for Megisaka Art. Understand the guidelines and policies for commissioning custom VTuber designs and digital artworks from Megisaka.',
  keywords:
    'terms of service, Megisaka TOS, commission guidelines, art policies, VTuber commission terms, digital art terms, Megisaka Art, custom VTuber policies, commission guidelines',
};

const Tos = async ({ params: { lang } }: LanguagePageProps) => {
  const { tosEn, tosPl } = await fetchTos();

  const currentBlock = lang === 'pl' ? tosPl : tosEn;

  return (
    <Main
      className={cn(
        'pb-0 px-page-mobile lg:px-page [&_ul]:!list-[inherit] [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:lg:gap-0 [&_ul]:list-inside [&_strong]:text-crimson [&_strong]:!font-bold',
        textVariants({ size: 'main' }),
      )}
    >
      <Headline heading="h1">TOS</Headline>
      <div className="flex flex-col pb-24 gap-6 mt-6 lg:mt-8 lg:pb-0">
        <PortableText
          value={currentBlock}
          components={{
            block: {
              h2: ({ children }) => (
                <Headline heading="h2">{children}</Headline>
              ),
            },
          }}
        />
      </div>
    </Main>
  );
};

export default Tos;
