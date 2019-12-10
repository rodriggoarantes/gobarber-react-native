import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { TYPES, signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      const erroProvider = 'Usuário não pode ser prestador de serviço';
      console.tron.error(erroProvider);
      Alert.alert('Erro no login', erroProvider);
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (error) {
    Alert.alert(
      'Falha no autenticação',
      'Erro ao realizar o login verifique os dados informados'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'providers', {
      name,
      email,
      password,
    });

    // history.push('/');
  } catch (error) {
    Alert.alert(
      'Falha no autenticação',
      'Erro ao realizar o login verifique os dados informados'
    );
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(TYPES.SIGNIN, signIn),
  takeLatest(TYPES.SIGNUP, signUp),
  takeLatest(TYPES.SIGNOUT, signOut),
]);
