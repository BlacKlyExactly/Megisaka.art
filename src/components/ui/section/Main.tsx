import { PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

const Main = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <main
    className={cn(
      'py-10 flex flex-col justify-center lg:gap-4 lg:pt-52 lg:pb-44',
      className,
    )}
  >
    {children}
  </main>
);

export default Main;
