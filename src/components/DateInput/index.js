import React, { useMemo, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import PropTypes from 'prop-types';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChange }) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  const setDate = (_, dateParam) => {
    setOpened(false);
    if (dateParam !== undefined) {
      onChange(dateParam);
    }
  };

  const open = () => {
    setOpened(true);
  };

  return (
    <Container>
      <DateButton onPress={open}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <Picker>
          <DateTimePicker
            value={date}
            display="spinner"
            locale="pt-BR"
            mode="date"
            onChange={setDate}
            minimumDate={new Date()}
            minuteInterval={60}
          />
        </Picker>
      )}
    </Container>
  );
}

DateInput.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
