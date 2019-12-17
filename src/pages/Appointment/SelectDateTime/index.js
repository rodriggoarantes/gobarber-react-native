import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format } from 'date-fns';
import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import { Container, Title, HourList, Hour } from './styles';

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const provider = navigation.getParam('provider');

  const handleSelectHour = time => {
    const timeWithoutTZ = time.replace('-02:00', '');
    navigation.navigate('Confirm', { provider, time: timeWithoutTZ });
  };

  useEffect(() => {
    async function load() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: format(date, 'yyyy-MM-dd'),
        },
      });

      setHours(response.data);
    }
    load();
  }, [date, provider.id]);

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
        <HourList
          data={hours}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectHour(item.value)}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}

SelectDateTime.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
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
