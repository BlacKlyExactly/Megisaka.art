import { PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

const Main = ({
  children,
  className,
  as,
}: PropsWithChildren<{ className?: string; as?: 'div' | 'main' }>) => {
  const Component = as ?? 'main';

  return (
    <Component
      className={cn(
        'py-10 pt-24 flex flex-col justify-center lg:gap-4 lg:pt-52 lg:pb-44',
        className,
      )}
    >
      {children}
    </Component>
  );
};

export default Main;
