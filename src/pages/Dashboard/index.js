import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';
import { Container, Title, List } from './styles';

function Dashboard({ isFocused }) {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    const response = await api.get('appointments');
    setAppointments(response.data);
  };

  const handleCancel = async id => {
    const response = await api.delete(`appointments/${id}`);
    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  };

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment data={item} onCancel={() => handleCancel(item.id)} />
          )}
        />
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

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: EventTabIcon,
};

export default withNavigationFocus(Dashboard);
