import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import apolloClient from './config/apollo-client';
import { store, persistor } from './config/redux-store';
import 'moment/locale/pt-br';
import 'react-toastify/dist/ReactToastify.css';

import Index from './screens/Index/Index';

import toastrCss from './styles/toastr.module.scss';

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Index />
        </BrowserRouter>
        <ToastContainer
          className={toastrCss.toastr}
          bodyClassName={toastrCss.toastr__body}
          progressClassName={toastrCss.toastr__progress}
        />
      </ApolloProvider>
    </PersistGate>
  </Provider>
);
