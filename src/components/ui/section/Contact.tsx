'use client';

import SectionContent from './SectionContent';
import ContactForm from '@/components/forms/ContactForm';
import { getTranslatedText } from '@/utils/getTranslatedText';
import { Language } from '@/utils/langPageProps';
import { Contact as ContactReq } from '@/lib/sanity/requests';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

const Contact = ({ lang, contact }: ContactProps) => {
  const pathname = usePathname();

  const isContactPage = pathname.endsWith('/contact');

  const Component = isContactPage ? 'div' : 'section';

  return (
    <Component
      className={cn('flex flex-col gap-6 lg:gap-0', {
        'lg:py-10': isContactPage,
      })}
    >
      <SectionContent
        title={getTranslatedText(contact.title, lang)}
        heading={isContactPage ? 'h1' : 'h2'}
      >
        {getTranslatedText(contact.description, lang)}
      </SectionContent>
      <div className="px-page-mobile lg:px-page">
        <ContactForm form={contact.form} lang={lang} />
      </div>
    </Component>
  );
};

type ContactProps = {
  lang?: Language;
  contact: ContactReq;
};

export default Contact;
