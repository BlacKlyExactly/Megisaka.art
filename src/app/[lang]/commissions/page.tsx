import { Metadata } from 'next';

import Commisions from '@/components/ui/section/Commisions';
import Main from '@/components/ui/section/Main';
import { fetchCommission, fetchCommissionSection } from '@/lib/sanity/requests';
import { LanguagePageProps } from '@/utils/langPageProps';

export const metadata: Metadata = {
  title: 'Art Commissions | Megisaka Art',
  description:
    'Commission custom VTuber designs and digital artworks from Megisaka. Get personalized, high-quality digital art tailored to your needs and bring your vision to life.',
  keywords:
    'art commissions, custom VTubers, VTuber commissions, digital art, Megisaka commissions, personalized digital art, custom art, VTuber artist, digital art commissions',
};

const CommissionsPage = async ({ params: { lang } }: LanguagePageProps) => {
  const commissions = await fetchCommission();
  const commissionSection = await fetchCommissionSection();

  const acceptedCommissions = commissions.filter(({ accepted }) => accepted);

  return (
    <Main className="pb-0">
      <Commisions
        className="pb-24 lg:pb-0"
        headline="h1"
        isSection={false}
        open={acceptedCommissions.length < 5}
        commissionSection={commissionSection}
        lang={lang}
      />
    </Main>
  );
};

export default CommissionsPage;
