'use server';

import WorkShowcase from '@/components/work/WorkShowcase';
import SectionContent from '@/components/section/SectionContent';
import Commisions from '@/components/section/Commisions';
import Header from '@/components/section/home/Header';

import {
  fetchCommission,
  fetchCommissionSection,
  fetchHome,
  fetchWorks,
} from '@/lib/sanity/requests';
import { LanguagePageProps } from '@/utils/langPageProps';
import { getTranslatedText } from '@/utils/getTranslatedText';
import { getImage } from '@/lib/sanity/getImage';

const Home = async ({ params: { lang } }: LanguagePageProps) => {
  const { header, latestWork } = await fetchHome();
  const commissionSection = await fetchCommissionSection();
  const commissions = await fetchCommission();
  const works = await fetchWorks(3);

  const acceptedCommissions = commissions.filter(({ accepted }) => accepted);

  const heroSliderImages = header.heroSlider.map((source) =>
    getImage(source, 612, 612),
  );

  return (
    <>
      <Header header={header} lang={lang} sliderImages={heroSliderImages} />
      <main className="mt-24 text-center lg:text-left lg:mt-0">
        <Commisions
          open={acceptedCommissions.length < 5}
          commissionSection={commissionSection}
          lang={lang}
        />
        <section id="latest">
          <SectionContent title={getTranslatedText(latestWork.title, lang)}>
            {getTranslatedText(latestWork.description, lang)}
          </SectionContent>
          <WorkShowcase
            className="mt-10"
            works={works.map(({ title, image, type }) => ({
              title,
              type: getTranslatedText(type, lang),
              image: getImage(image, 612, 612),
            }))}
          />
        </section>
      </main>
    </>
  );
};

export default Home;
