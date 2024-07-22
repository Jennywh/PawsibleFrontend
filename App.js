import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import RequestPetSitterScreen from './app/RequestPetSitterScreen';

// Import your custom components/screens
import LoginScreen from './app/LoginScreen';
import SignupScreen from './app/SignupScreen';
import HomeScreen from './app/HomeScreen';
import CommunityScreen from './app/CommunityScreen';
import MessageScreen from './app/MessageScreen';
import { RequestTabs } from './app/RequestTabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainAppTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Requests" component={RequestTabs} options={{ headerShown: false }} /> 
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Inbox" component={MessageScreen} />
      <Tab.Screen name="Profile" component={MessageScreen} /> 
    </Tab.Navigator>
  );
};


const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainApp" component={MainAppTabs} options={{ headerShown: false }} />
          <Stack.Screen name="RequestPetSitterScreen" component={RequestPetSitterScreen} options={{ title: 'Request Pet Sitter' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
