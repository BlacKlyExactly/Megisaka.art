import { Heading, Img, Link, Section, Text } from '@react-email/components';
import * as React from 'react';
import EmailBase from './EmailBase';
import { SanityImageAssetDocument } from 'next-sanity';

const CommissionArtistMail = ({
  baseUrl = 'http://localhost:3000',
  name = 'Black',
  email = 'supreme24d@gmail.com',
  artType = 'Other',
  description = 'Krótki opis rysunku, który ma zostać narysowany',
  assets = [
    { url: 'http://localhost:3000/images/banner.jpg' },
    { url: 'http://localhost:3000/images/banner.jpg' },
  ] as SanityImageAssetDocument[],
}) => {
  return (
    <EmailBase baseUrl={baseUrl} title={`Nowe zlecenie od ${name}`}>
      <Heading className="text-2xl mb-10">Nowe zlecenie</Heading>
      <Text>
        Zlecenie możesz zaakceptować, bądź usunąc w panelu administratora na{' '}
        <Link href="https://cms.megisaka.art">cms.megisaka.art</Link> lub
        ewentualnie zgłoś się do <strong>Blacka</strong>. Pamiętaj dać odzew bo
        klient nie dostanie już żadnego innego maila poza potwierdzeniem.
      </Text>
      <br />
      <Text>
        <strong>Imię</strong>
        <br />
        {name}
      </Text>
      <Text>
        <strong>Email</strong>
        <br />
        <Link href={`mailto:${email}`}>{email}</Link>
      </Text>
      <Text>
        <strong>Typ rysunku</strong>
        <br />
        {artType}
      </Text>
      <Text>
        <strong>Opis</strong>
        <br />
        {description}
      </Text>
      <br />
      <Text className="mt-10 mb-10">
        <strong>Załączniki</strong>
      </Text>
      <Section>
        {assets.map(({ url }) => (
          <Img
            key={url}
            src={url}
            className="w-full mt-2 rounded-md object-cover"
          />
        ))}
      </Section>
    </EmailBase>
  );
};

export default CommissionArtistMail;
