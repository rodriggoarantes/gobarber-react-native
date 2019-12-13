import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Separator,
  Title,
  SubmitButton,
  Form,
  FormInput,
  LogoutButton,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.auth.loading);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = () => {
    dispatch(
      updateProfileRequest({
        id: profile.id,
        name,
        email,
        oldpass: oldPassword,
        password: newPassword,
        confirmpass: confirmPassword,
      })
    );
  };

  const handleLogout = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    setNewPassword('');
    setConfirmPassword('');
    setOldPassword('');
  }, [profile]);

  return (
    <Background>
      <Container>
        <Title>Meu Perfil</Title>

        <Form>
          <FormInput
            icon="person-outline"
            placeholder="Digite o seu nome"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon="mail-outline"
            placeholder="Digite o seu e-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha atual"
            returnKeyType="send"
            ref={oldPasswordRef}
            onSubmitEditing={() => newPasswordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua nova senha"
            returnKeyType="send"
            ref={newPasswordRef}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirme sua nova senha"
            returnKeyType="send"
            ref={confirmPasswordRef}
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Enviar
          </SubmitButton>

          <LogoutButton loading={loading} onPress={handleLogout}>
            Sair do GoBarber
          </LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

const PersonTabIcon = ({ tintColor }) => (
  <Icon name="person" size={20} color={tintColor} />
);

PersonTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: PersonTabIcon,
};
