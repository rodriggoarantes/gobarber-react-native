import React from 'react';

import Background from '~/components/Background';
import Input from '~/components/Input';

import { Container } from './styles';

export default function SignIn() {
  return (
    <Background>
      <Container>
        <Input icon="call" placeholder="Digite o seu nome" />
      </Container>
    </Background>
  );
}
