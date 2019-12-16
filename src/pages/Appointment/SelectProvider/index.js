import React, { useState, useEffect } from 'react';
import { HeaderBackButton } from 'react-navigation-stack';
import PropTypes from 'prop-types';

import { API_HOST } from 'react-native-dotenv';
import api from '~/services/api';

import Background from '~/components/Background';
import { Container, List, Provider, Avatar, Name } from './styles';

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const localhost = 'localhost';
      const response = await api.get('providers');
      const providersComplete = response.data
        .filter(provider => !provider.avatar || !provider.avatar.url)
        .map(provider => {
          let apiAvatarUrl =
            (provider.avatar && provider.avatar.url) ||
            `https://api.adorable.io/avatar/50/${provider.name}.png`;

          if (apiAvatarUrl.includes(localhost)) {
            apiAvatarUrl = apiAvatarUrl.replace(localhost, API_HOST);
          }
          provider.avatar_uri = apiAvatarUrl;
          return provider;
        });
      setProviders(providersComplete);
    }
    loadProviders();
  }, []);

  return (
    <Background>
      <Container>
        <List
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider
              onPress={() => {
                navigation.navigate('SelectDateTime', { provider });
              }}
            >
              <Avatar source={{ uri: provider.avatar_uri }} />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectProvider.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o prestador',
  headerLeft: () => (
    <HeaderBackButton
      tintColor="#FFF"
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    />
  ),
});
