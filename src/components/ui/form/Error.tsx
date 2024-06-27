import { PropsWithChildren } from 'react';

const Error = ({ children }: PropsWithChildren<any>) => (
  <p className="text-crimson font-bold">{children}</p>
);

export default Error;
