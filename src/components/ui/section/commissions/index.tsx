import CommissionsSection from './CommissionsSection';
import { fetchCommissionSection, fetchCommission } from '@/lib/sanity/requests';
import { Language } from '@/utils/langPageProps';

const Commissions = async ({ lang }: { lang?: Language }) => {
  const commissionSection = await fetchCommissionSection();
  const commissions = await fetchCommission();

  const acceptedCommissions = commissions.filter(({ accepted }) => accepted);

  return (
    <CommissionsSection
      open={acceptedCommissions.length < 5}
      commissionSection={commissionSection}
      lang={lang}
    />
  );
};

export default Commissions;
