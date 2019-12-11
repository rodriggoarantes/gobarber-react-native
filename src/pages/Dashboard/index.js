import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import api from '~/services/api';

import Appointment from '~/components/Appointment';
import { Container, Title, List } from './styles';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const response = await api.get('appointments');
    setAppointments(response.data);
  }

  async function handleCancel(id) {
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
  }

  useEffect(() => {
    loadAppointments();
  }, []);

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

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: EventTabIcon,
};
