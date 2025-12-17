import { useQuery } from '@apollo/client/react';

export const useGraphQLQuery = (query, options = {}) => {
  const { data, loading, error, refetch } = useQuery(query, {
    ...options,
    fetchPolicy: options.fetchPolicy || 'cache-and-network',
  });

  return { data, loading, error, refetch };
};
