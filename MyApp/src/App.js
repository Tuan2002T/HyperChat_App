import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './redux/store';
import SplashScreen from './screens/SplashScreen';

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SplashScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;