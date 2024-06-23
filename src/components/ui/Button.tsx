import { ButtonHTMLAttributes, HTMLProps, PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';
import Text from './typography/Text';

const Button = ({ className, children, ...domProps }: ButtonProps) => (
  <button
    {...domProps}
    className={cn(
      'py-2.5 lg:py-4 lg:px-11 px-8 border-2 border-crimson rounded-lg text-crimson hover:bg-crimson hover:text-white transition-colors bg-dark bg-opacity-35 backdrop-blur-[8.8px]',
      className,
    )}
  >
    <Text size="headingButton">{children}</Text>
  </button>
);

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default Button;