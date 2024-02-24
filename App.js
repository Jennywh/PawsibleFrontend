import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import LoginScreen from './app/LoginScreen';
import SignupScreen from './app/SignupScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('login');

  const switchScreen = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    currentScreen === 'login' ? 
    <LoginScreen onSwitchScreen={() => switchScreen('signup')} /> :
    <SignupScreen onSwitchScreen={() => switchScreen('login')} />
    
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
