import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';

const fakeRequests = {
  created: [
    { id: '1', title: 'Need a sitter for Max', status: 'Pending', date: 'Apr 5' },
    { id: '2', title: 'Looking for a companion for Bella', status: 'Accepted', date: 'Mar 30' },
    { id: '3', title: 'Weekend care for Charlie', status: 'Confirmed', date: 'Mar 28' },
  ],

};

export default function CreatedRequestsScreen() {
  return (
    <ScrollView style={styles.container}>
      {fakeRequests.created.map((request) => (
        <React.Fragment key={request.id}>
          <List.Item
            title={request.title}
            description={`Status: ${request.status}`}
            right={() => <Text>{request.date}</Text>}
            onPress={() => {/* handle request press */}}
          />
          <Divider />
        </React.Fragment>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
