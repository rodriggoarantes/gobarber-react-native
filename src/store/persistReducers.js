import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'gobarber',
  storage: AsyncStorage,
  whitelist: ['auth', 'user'],
};

export default reducers => {
  return persistReducer(persistConfig, reducers);
};
