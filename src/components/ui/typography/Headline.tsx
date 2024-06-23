import { HTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

type HeadlineElement = 'h1' | 'h2';

interface HeadlineProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headlineVariants> {
  as?: HeadlineElement;
}

const headlineVariants = cva('tracking-[4%] !text-crimson font-vinque', {
  variants: {
    heading: {
      h1: 'text-[2.5rem] lg:text-[4.063rem]',
      h2: 'text-4xl lg:text-5xl text-red',
      h3: 'text-3xl lg:text-4xl',
    },
  },
  defaultVariants: {
    heading: 'h1',
  },
});

const Headline = ({ as, heading, children, className }: HeadlineProps) => {
  const Component = as ?? heading ?? 'h1';

  return (
    <Component className={cn(headlineVariants({ className, heading }))}>
      {children}
    </Component>
  );
};

export default Headline;
