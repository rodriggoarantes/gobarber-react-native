import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { formatRelative, parseISO } from 'date-fns';
import br from 'date-fns/locale/pt-BR';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { API_HOST } from 'react-native-dotenv';
import api from '~/services/api';

import Background from '~/components/Background';
import { Container, Avatar, Time, Name, SubmitButton } from './styles';

export default function Confirm({ navigation }) {
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');

  const timeFormatted = useMemo(
    () =>
      formatRelative(parseISO(time), new Date(), {
        locale: br,
      }),
    [time]
  );

  const avatarUrl = useMemo(() => {
    const localhost = 'localhost';
    let apiAvatarUrl =
      (provider.avatar && provider.avatar.url) ||
      `https://api.adorable.io/avatar/50/${provider.name}.png`;

    if (apiAvatarUrl.includes(localhost)) {
      apiAvatarUrl = apiAvatarUrl.replace(localhost, API_HOST);
    }
    return apiAvatarUrl;
  }, [provider]);

  const handleAddAppointment = async () => {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigate('Dashboard');
  };

  return (
    <Background>
      <Container>
        <Avatar source={{ uri: avatarUrl }} />
        <Name>{provider.name}</Name>
        <Time>{timeFormatted}</Time>

        <SubmitButton onPress={handleAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar o agendamento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
