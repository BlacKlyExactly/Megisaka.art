import { ElementType, HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

export const textVariants = cva(
  'text-sm tracking-[4%] !leading-[230%] font-normal',
  {
    variants: {
      size: {
        nav: '!leading-none !tracking-normal',
        main: 'font-light text-xs lg:text-sm lg:font-normal',
        heading:
          'text-[0.938rem] lg:text-base !leading-[200%] lg:!leading-[230%] font-light',
        headingButton:
          'text-[0.85rem] mt-[4px] font-bold !leading-none lg:text-base lg:mt-[2px]',
        footer: '!leading-none !tracking-normal text-sm !font-light',
        navHome: 'text-2xl font-vinque !leading-none',
      },
    },
  },
);

interface TextProps<TElement extends ElementType = 'p' | 'li'>
  extends Omit<HTMLAttributes<TElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: TElement;
}

const Text = ({ as, children, size, className }: TextProps) => {
  const Component = as ?? 'p';

  return (
    <Component className={cn(textVariants({ className, size }))}>
      {children}
    </Component>
  );
};

export default Text;
