import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GRAPHQL_ENDPOINT } from '../../config/Hasura';
import { ApolloLink, concat } from 'apollo-link';

const createApolloClient = (token) => {
	token = `Bearer ${token}`;
	const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });
	const authMiddleware = new ApolloLink((operation, forward) => {
		operation.setContext({
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			}
		});
		return forward(operation);
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
		link: concat(authMiddleware, httpLink),
		cache: new InMemoryCache(),
		defaultOptions: defaultOptions
	});
};
export default createApolloClient;