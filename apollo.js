import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GRAPHQL_ENDPOINT } from './config/Hasura';
import { ApolloLink, concat } from 'apollo-link';

const createApolloClient = (token) => {
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  
  const defaultOptions = {
		watchQuery: {
			fetchPolicy: 'no-cache',
			errorPolicy: 'ignore',
		},
		query: {
			fetchPolicy: 'no-cache',
			errorPolicy: 'all',
		},
	};

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
  })
}

export default createApolloClient;