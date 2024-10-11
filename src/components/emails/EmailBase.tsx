import {
  Tailwind,
  Body,
  Img,
  Html,
  Head,
  Container,
  Section,
  Link,
} from '@react-email/components';
import twConfig from './tailwind.config';
import { ReactNode } from 'react';

const EmailBase = ({
  baseUrl = 'http://localhost:3000',
  children = null as ReactNode,
  title = '',
}) => (
  <Tailwind config={twConfig}>
    <Html>
      <Head>
        <title>{title}</title>
      </Head>
      <Body className="py-8 font-sans">
        <Container className="mx-auto">
          <Section>
            <Link href="https://megisaka.art">
              <Img
                width={160}
                height={51}
                src={`${baseUrl}/images/logo_new.png`}
                className="w-40"
              />
            </Link>
          </Section>
          <Section className="border border-crimson/10 border-solid mt-10 rounded-md">
            <Section>
              <Img
                src={`${baseUrl}/images/banner.jpg`}
                width={600}
                height={300}
                className="w-full object-cover rounded-t-md"
              />
            </Section>
            <Section className="p-5 lg:p-10">{children}</Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default EmailBase;
