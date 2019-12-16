import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

SelectProvider.navigationOptions = () => ({
  title: 'Selecione o prestador',
});

SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o prestador',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
