import ApolloClient from 'apollo-boost';

import config from 'tingme/config';

let token;
export const setToken = newToken => (token = newToken);

const createGraphqlClient = uri => {
  const client = new ApolloClient({
    uri,
    request: operation => {
      if (token) {
        operation.setContext({
          headers: {
            'x-access-token': token
          }
        });
      }
    }
  });
  client.defaultOptions = { query: { fetchPolicy: 'network-only' } };
  return client;
};

export const userGraphClient = createGraphqlClient(config.userGraphUrl);
export const conversationGraphClient = createGraphqlClient(config.conversationGraphUrl);
export const tingGraphClient = createGraphqlClient(config.tingGraphUrl);
