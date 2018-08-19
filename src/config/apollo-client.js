import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, Observable } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import localForage from 'localforage';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const request = async (operation) => {
  const token = await localForage.getItem('token');

  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

const requestLink = new ApolloLink((operation, forward) => new Observable((observer) => {
  let handle;
  Promise.resolve(operation)
    .then(oper => request(oper))
    .then(() => {
      handle = forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      });
    })
    .catch(observer.error.bind(observer));

  return () => {
    if (handle) handle.unsubscribe();
  };
}));

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_API_URL,
});

const link = ApolloLink.from([
  requestLink,
  uploadLink,
]);


const client = new ApolloClient({
  ssrMode: false,
  link,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions,
});

export default client;
