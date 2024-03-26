import React from 'react';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './redux/store';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterStackNavigator from './components/RegisterStackNavigator';
import MainStackNavigator from './components/MainStackNavigator';

const App = () => {
  const currentScreen = useSelector(state => state.screen.currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen />;
      case 'Login':
        return <LoginScreen />;
      case 'Register':
        return <RegisterStackNavigator />;
      case 'Main':
        return <MainStackNavigator />;
      default:
        return <SplashScreen />;
    }
  };

  return renderScreen();
};

const Root = () => (
  <Provider store={store}>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </Provider>
);

export default Root;
