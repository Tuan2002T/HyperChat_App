import React from 'react';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import store from './redux/store';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './components/MainTabNavigator';
import RegisterStack from './components/RegisterStackNavigator';

const App = () => {
  const currentScreen = useSelector(state => state.screen.currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen />;
      case 'Login':
        return <LoginScreen />;
      case 'Register':
        // return <RegisterScreen />;
        return <RegisterStack />;
      case 'Main':
        return <MainScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return renderScreen();
};

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
