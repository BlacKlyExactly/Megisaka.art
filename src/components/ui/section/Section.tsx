'use client';

import { cn } from '@/utils/cn';
import { PropsWithChildren, forwardRef } from 'react';

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, children, ...props }, ref) => (
    <section ref={ref} {...props} className={cn('pb-24 lg:pb-32', className)}>
      {children}
    </section>
  ),
);

type SectionProps = PropsWithChildren<{ className?: string; id?: string }>;

export default Section;
