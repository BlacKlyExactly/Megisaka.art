import { Heading, Link, Text } from '@react-email/components';
import EmailBase from './EmailBase';

const MessageArtistMail = ({
  baseUrl = 'http://localhost:3000',
  name = 'Black',
  email = 'supreme24d@gmail.com',
  description = 'Przykładowa treść wiadomości',
}) => (
  <EmailBase baseUrl={baseUrl} title={`Nowa wiadomość od ${name}`}>
    <Heading className="text-2xl mb-10">Nowa wiadomość</Heading>
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
      <strong>Treść wiadomości</strong>
      <br />
      {description}
    </Text>
  </EmailBase>
);

export default MessageArtistMail;
