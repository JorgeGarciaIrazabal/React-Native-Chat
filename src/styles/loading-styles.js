import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.2,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
