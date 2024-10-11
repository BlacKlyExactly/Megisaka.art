import { Column, Heading, Link, Row, Text } from '@react-email/components';
import EmailBase from './EmailBase';

const MessageClientMail = ({
  baseUrl = 'http://localhost:3000',
  name = 'Black',
}) => (
  <EmailBase baseUrl={baseUrl} title={`Message confirmation`}>
    <Heading className="text-2xl mb-10">Message confirmation</Heading>
    <Text>
      Hi <strong>{name}</strong>!
    </Text>
    <Text>
      I have recieved your message and I'm gonna contact with you soon :3 If you
      have any questions, contact with me.
    </Text>
    <Row>
      <Column>
        <Text>
          <strong>Email</strong>
          <br />
          <Link href="mailto:megisapolska@gmail.com">
            megisapolska@gmail.com
          </Link>
        </Text>
      </Column>
      <Column>
        <Text>
          <strong>Discord</strong>
          <br />
          megisaka
        </Text>
      </Column>
    </Row>
    <Text>
      Greetings
      <br />
      <strong>Megisaka</strong>
    </Text>
  </EmailBase>
);

export default MessageClientMail;
