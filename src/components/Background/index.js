import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Background = styled(LinearGradient).attrs({
  colors: ['#b2ebf2', '#e0f7fa'],
})`
  flex: 1;
`;
