import React from 'react';

import Background from '~/components/Background';
import Button from '~/components/Button';
import Input from '~/components/Input';

import { Container } from './styles';

export default function SignIn() {
  return (
    <Background>
      <Container>
        <Input
          style={{ marginTop: 30 }}
          icon="call"
          placeholder="Digite o seu nome"
        />

        <Button style={{ marginTop: 10 }}>Entrar</Button>
      </Container>
    </Background>
  );
}
