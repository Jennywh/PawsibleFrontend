import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button, Dialog, Portal,Card, Paragraph,Avatar} from 'react-native-paper';
import { ScrollView } from 'react-native';

const communityFeed = [
	{ id: '1', author: 'Sam', content: 'Found a great new park for dogs in the area!' },
	{ id: '2', author: 'Jordan', content: 'Can anyone recommend a good vet for exotic pets?' }
	// Add more posts
];
const LeftContent = (props) => <Avatar.Icon {...props} icon="paw" />

const CommunityScreen = () => {
	return (
		<ScrollView style={styles.container}>
			{communityFeed.map(post => (
				<Card key={post.id} style={styles.card}>
					<Card.Title title={post.author} left={LeftContent} />
					<Card.Content>
						<Paragraph>{post.content}</Paragraph>
					</Card.Content>
				</Card>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  padding: 10,
	},
	title: {
	  marginVertical: 10,
	},
	card: {
	  marginBottom: 10,
	},
	divider: {
	  marginVertical: 20,
	},
  });

export default CommunityScreen;
