import { AsyncStorage } from 'react-native';
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  Reactotron.configure({ port: 9090 }) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .setAsyncStorageHandler(AsyncStorage)
    .connect() // let's connect!;
    .clear();
}
