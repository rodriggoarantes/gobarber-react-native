import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import '~/config/ReactotronConfig';

import { store, persistor } from '~/store';
import createRouter from '~/routes';

export default function App() {
  console.tron.log('GoBarber - App');
  const signed = false;
  const Routes = createRouter(signed);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <Routes />
      </PersistGate>
    </Provider>
  );
}
