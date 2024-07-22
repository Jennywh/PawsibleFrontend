import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CreatedRequestsScreen from './CreatedRequestsScreen';
import AcceptedRequestsScreen from './AcceptedRequestsScreen';
import { SafeAreaView } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export function RequestTabs() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: 'blue' }, // Customize the indicator (underline) style
          tabBarActiveTintColor: 'blue', // Color of the text for the selected tab
          tabBarInactiveTintColor: 'gray' // Color of the text for the unselected tabs
        }}
      >
        <Tab.Screen name="Created" component={CreatedRequestsScreen} />
        <Tab.Screen name="Accepted" component={AcceptedRequestsScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
