import React from 'react';

import '~/config/ReactotronConfig';
import Reactotron from 'reactotron-react-native';

import createRouter from '~/routes';

export default function App() {
  Reactotron.log('GoBarber - App');
  const signed = false;
  const Routes = createRouter(signed);
  return (
    <>
      <Routes />
    </>
  );
}
