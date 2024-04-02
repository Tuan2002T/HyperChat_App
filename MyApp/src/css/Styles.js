import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: '95%',
    alignItems: 'flex-end',
    padding: 10,
  },
  buttonContainer: {
    width: '90%',
    alignItems: 'center',
  },
  firstButton: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 9999,
    justifyContent: 'center',
    backgroundColor: '#76ABAE',
  },
  secondButton: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 9999,
    justifyContent: 'center',
    backgroundColor: '#EEE',
  },
});

export default styles;
