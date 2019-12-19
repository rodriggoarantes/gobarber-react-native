import { AsyncStorage } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

if (__DEV__) {
  Reactotron.setAsyncStorageHandler(AsyncStorage);
  Reactotron.configure({
    name: 'GoBarber App',
    host: '10.62.40.115',
    port: 9090,
  }) // controls connection & communication settings
    .useReactNative({
      asyncStorage: { ignore: ['secret'] },
    }) // add all built-in react native plugins
    .use(reduxPlugin())
    .use(sagaPlugin())
    .connect() // let's connect!;
    .clear();

  console.tron = Reactotron;
}
