import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${Platform.OS === 'android' ? 20 : 0};
`;
