import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { API_HOST } from 'react-native-dotenv';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  const providerAvatar = useMemo(() => {
    const localhost = 'localhost';
    let apiAvatarUrl =
      data.provider && data.provider.avatar
        ? data.provider.avatar.url
        : `https://api.adorable.io/avatar/50/${data.provider.name}.png`;

    if (apiAvatarUrl.includes(localhost)) {
      apiAvatarUrl = apiAvatarUrl.replace(localhost, API_HOST);
    }
    return apiAvatarUrl;
  }, [data.provider]);

  return (
    <Container past={data.past}>
      <Left>
        <Avatar source={{ uri: providerAvatar }} />
        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}

Appointment.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string.isRequired,
    past: PropTypes.bool,
    cancelable: PropTypes.bool,
    canceled_at: PropTypes.string,
    provider: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};
