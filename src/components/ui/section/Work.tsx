import WorkShowcase from '@/components/work/WorkShowcase';
import SectionContent from './SectionContent';
import Section from './Section';
import { fetchHome, fetchWorks } from '@/lib/sanity/requests';
import { getImage } from '@/lib/sanity/getImage';
import { getTranslatedText } from '@/utils/getTranslatedText';
import { Language } from '@/utils/langPageProps';

const WorkSection = async ({ lang, limit }: WorkSectionProps) => {
  const works = await fetchWorks(limit);
  const { latestWork } = await fetchHome();

  return (
    <Section>
      <SectionContent title={getTranslatedText(latestWork.title, lang)}>
        {getTranslatedText(latestWork.description, lang)}
      </SectionContent>
      <WorkShowcase
        className="mt-10"
        works={works.map(({ title, image, type, slug }) => ({
          title,
          type: getTranslatedText(type, lang),
          image: getImage(image, 612, 612),
          alt: image.alt,
          slug,
          lqip: image.asset.metadata.lqip,
        }))}
      />
    </Section>
  );
};

type WorkSectionProps = {
  lang?: Language;
  limit?: number;
};

export default WorkSection;
