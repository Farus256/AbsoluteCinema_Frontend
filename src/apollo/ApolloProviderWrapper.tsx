import { ApolloProvider } from '@apollo/client/react';
import { client } from './client';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ApolloProviderWrapper = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
