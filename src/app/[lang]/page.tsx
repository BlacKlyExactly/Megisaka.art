import WorkShowcase from '@/components/work/WorkShowcase';
import SectionContent from '@/components/ui/section/SectionContent';
import Commisions from '@/components/ui/section/Commisions';
import Header from '@/components/ui/section/Header';
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

export const maxDuration = 60;

const Home = async ({ params: { lang } }: LanguagePageProps) => {
  const { header, latestWork } = await fetchHome();
  const commissionSection = await fetchCommissionSection();
  const commissions = await fetchCommission();
  const works = await fetchWorks(3);

  const acceptedCommissions = commissions.filter(({ accepted }) => accepted);

  const heroSliderImages = header.heroSlider.map((source) => ({
    url: getImage(source, 500, 500),
    alt: source.alt,
    lqip: source.asset.metadata.lqip,
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
            works={works.map(({ title, image, type, slug }) => ({
              title,
              type: getTranslatedText(type, lang),
              image: getImage(image, 500, 500),
              alt: image.alt,
              slug,
              lqip: image.asset.metadata.lqip,
            }))}
          />
        </Section>
      </main>
    </>
  );
};

export default Home;
