// MessageScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Avatar, Divider } from 'react-native-paper';

const fakeMessages = [
  { id: '1', from: 'Alice', subject: 'Lunch Plans', content: 'Hey, where do you want to go for lunch today?' },
  { id: '2', from: 'Bob', subject: 'Project Update', content: 'Can we meet to discuss the project updates?' },
  { id: '3', from: 'Charlie', subject: 'Weekend Getaway', content: 'Thinking of going hiking this weekend. Interested?' },
  // Add more fake messages here
];

const MessageScreen = () => {
  return (
    <View style={styles.container}>
      <List.Section>
        {fakeMessages.map((message) => (
          <React.Fragment key={message.id}>
            <List.Item
              title={message.from}
              description={message.subject}
              left={(props) => <Avatar.Icon {...props} icon="email" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {/* handle message press */}}
            />
            <Divider />
          </React.Fragment>
        ))}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessageScreen;
