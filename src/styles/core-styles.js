import { StyleSheet } from 'react-native';
import theme from './ui-theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    padding: 10
  },
  input: {
    color: theme.palette.primaryColor
  },
  facebookBtn: {
    flex: 1,
    alignItems: 'center',
    padding: 15
  }
});