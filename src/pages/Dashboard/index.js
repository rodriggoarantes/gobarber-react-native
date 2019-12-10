import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import { Container, Title } from './styles';

export default function Dashboard() {
  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
      </Container>
    </Background>
  );
}

const EventTabIcon = ({ tintColor }) => (
  <Icon name="event" size={20} color={tintColor} />
);

EventTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: EventTabIcon,
};
