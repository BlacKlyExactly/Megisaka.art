'use client';

import { PropsWithChildren } from 'react';

import Headline from '../ui/typography/Headline';
import Text from '../ui/typography/Text';

const SectionContent = ({ children, title }: SectionContentProps) => (
  <div className="px-page-mobile lg:px-page">
    <Headline heading="h2">{title}</Headline>
    <Text size="main" className="mt-4 lg:w-[45%] lg:mt-8">
      {children}
    </Text>
  </div>
);

type SectionContentProps = PropsWithChildren<{
  title: string;
}>;

export default SectionContent;
