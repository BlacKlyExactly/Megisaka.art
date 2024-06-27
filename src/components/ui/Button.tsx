'use client';

import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';

import Text from './typography/Text';
import Loader from './Loader';
import { cn } from '@/utils/cn';

const Button = ({
  className,
  children,
  isPending,
  ...domProps
}: ButtonProps & { isPending?: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...domProps}
      className={cn(
        'py-2.5 lg:py-4 lg:px-11 px-8 border-2 border-crimson rounded-lg text-crimson hover:bg-crimson hover:text-white transition-colors bg-dark bg-opacity-35 backdrop-blur-[8.8px]',
        className,
      )}
    >
      {pending || isPending ? (
        <Loader />
      ) : (
        <Text size="headingButton">{children}</Text>
      )}
    </button>
  );
};

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default Button;
