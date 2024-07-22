import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';

const fakeRequests = {

  accepted: [
    { id: '4', title: 'Sitting for Luna', status: 'Confirmed', date: 'Apr 1' },
    { id: '5', title: 'Daycare for Oscar', status: 'Pending', date: 'Apr 3' },
  ],
};


export default function AcceptedRequestsScreen() {
  return (
    <ScrollView style={styles.container}>
      {fakeRequests.accepted.map((request) => (
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
