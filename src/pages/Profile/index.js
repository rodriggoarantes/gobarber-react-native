import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

// import { Container } from './styles';

export default function Profile() {
  return <Background />;
}

const PersonTabIcon = ({ tintColor }) => (
  <Icon name="person" size={20} color={tintColor} />
);

PersonTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: PersonTabIcon,
};