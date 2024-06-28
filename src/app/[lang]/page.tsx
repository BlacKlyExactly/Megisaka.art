'use server';

import WorkShowcase from '@/components/work/WorkShowcase';
import SectionContent from '@/components/ui/section/SectionContent';
import Commisions from '@/components/ui/section/Commisions';
import Header from '@/components/ui/section/home/Header';
import {
  fetchCommission,
  fetchCommissionSection,
  fetchHome,
  fetchWorks,
} from '@/lib/sanity/requests';
import { LanguagePageProps } from '@/utils/langPageProps';
import { getTranslatedText } from '@/utils/getTranslatedText';
import { getImage } from '@/lib/sanity/getImage';
import Section from '@/components/ui/section/Section';

const Home = async ({ params: { lang } }: LanguagePageProps) => {
  const { header, latestWork } = await fetchHome();
  const commissionSection = await fetchCommissionSection();
  const commissions = await fetchCommission();
  const works = await fetchWorks(3);

  const acceptedCommissions = commissions.filter(({ accepted }) => accepted);

  const heroSliderImages = header.heroSlider.map((source) => ({
    url: getImage(source, 612, 612),
    alt: source.alt,
  }));

  return (
    <>
      <Header header={header} lang={lang} sliderImages={heroSliderImages} />
      <main className="mt-24 text-center lg:text-left lg:mt-0">
        <Commisions
          open={acceptedCommissions.length < 5}
          commissionSection={commissionSection}
          lang={lang}
        />
        <Section>
          <SectionContent title={getTranslatedText(latestWork.title, lang)}>
            {getTranslatedText(latestWork.description, lang)}
          </SectionContent>
          <WorkShowcase
            className="mt-10"
            works={works.map(({ title, image, type }) => ({
              title,
              type: getTranslatedText(type, lang),
              image: getImage(image, 612, 612),
              alt: image.alt,
            }))}
          />
        </Section>
      </main>
    </>
  );
};

export default Home;
