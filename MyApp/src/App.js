import React from 'react';
import {Provider} from 'react-redux';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './redux/store';
import {PaperProvider} from 'react-native-paper';

import SplashScreen from './views/SplashScreen';
import LoginScreen from './views/LoginScreen';
import RegisterStackNavigator from './components/RegisterStackNavigator';
import MainStackNavigator from './components/MainStackNavigator';
import ForgotPasswordScreen from './views/ForgotPasswordScreen';
import FlashMessageManager from './components/FlashMessageManager';
const App = () => {
  const currentScreen = useSelector(state => state.screen.currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen />;
      case 'Login':
        return <LoginScreen />;
      case 'ForgotPassword':
        return <ForgotPasswordScreen />;
      case 'Register':
        return <RegisterStackNavigator />;
      case 'Main':
        return <FlashMessageManager><MainStackNavigator /></FlashMessageManager>;
      default:
        return <SplashScreen />;
    }
  };

  return renderScreen();
};

const Root = () => (
  <PaperProvider>
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  </PaperProvider>
);

export default Root;
