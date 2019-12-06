import React from 'react';
import { Image } from 'react-native';
import logo from '~/assets/logo.png';

import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="person-outline"
            placeholder="Digite o seu nome"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <FormInput
            icon="mail-outline"
            placeholder="Digite o seu e-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha"
          />
        </Form>

        <SubmitButton onPress={() => {}}>Enviar</SubmitButton>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Voltar</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
