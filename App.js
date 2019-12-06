import React from 'react';
import { StatusBar } from 'react-native';

import '~/config/ReactotronConfig';

import createRouter from '~/routes';

export default function App() {
  console.tron.log('GoBarber - App');
  const signed = false;
  const Routes = createRouter(signed);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
}
