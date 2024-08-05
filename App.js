import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import ProfileScreen from './src/screens/ProfileScreen';
import MessageScreen from './src/screens/MessageScreen';
import MatchScreen from './src/screens/MatchScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import PetDetailsScreen from './src/screens/PetDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const commonHeaderOptions = {
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0, // Remove the bottom border line
    shadowColor: 'transparent' // Remove shadow for iOS
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  headerTintColor: '#000'
};

const ProfileStack = () => (
  <Stack.Navigator screenOptions={commonHeaderOptions}>
    <Stack.Screen
      name="ViewProfile"
      component={ProfileScreen}
      options={({ navigation }) => ({
        title: 'My Profile',
        headerRight: () => <Button onPress={() => navigation.navigate('EditProfile')} title="Edit" color="#ff9800" />
      })}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={({ navigation }) => ({
        title: 'Edit Profile',
        headerLeft: () => <Button onPress={() => navigation.navigate('ViewProfile')} title="Back" color="#ff9800" />,
        headerRight: () => <Button onPress={() => alert('Save pressed')} title="Save" color="#ff9800" />
      })}
    />
    <Stack.Screen
      name="PetDetails"
      component={PetDetailsScreen}
      options={({ navigation }) => ({
        title: 'Pet Profile',
        headerLeft: () => <Button onPress={() => navigation.navigate('EditProfile')} title="Back" color="#ff9800" />,
        headerRight: () => <Button onPress={() => alert('Save pressed')} title="Save" color="#ff9800" />
      })}
    />
  </Stack.Navigator>
);

const MainAppTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Match" component={MatchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Inbox" component={MessageScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MainApp" component={MainAppTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
