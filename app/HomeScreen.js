import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, Dialog, Portal, Text } from 'react-native-paper';

// Fake Data
const userInfo = {
	name: 'Jenny Wang',
	paws: 50 // Assuming 50 paws are awarded upon registration
};

const nearbyRequests = [
	{ id: '1', owner: 'Alex', petType: 'Dog', petName: 'Buddy', date: 'March 5' },
	{ id: '2', owner: 'Jamie', petType: 'Cat', petName: 'Whiskers', date: 'March 8' }
	// Add more requests as needed
];

const tipsAndArticles = [
	{ id: '1', title: '5 Tips for First-Time Pet Sitters', summary: 'Becoming a pet sitter is exciting, but there are things you should know...' },
	{ id: '2', title: 'How to Make Your Home Pet-Friendly', summary: 'A pet-friendly home is essential for the health and well-being of your pets...' }
	// Add more articles as needed
];

const HomeScreen = () => {
	const [isDialogVisible, setIsDialogVisible] = useState(false);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.profileContainer}>
				<Avatar.Text size={40} label='JW' style={styles.avatar} />
				<TouchableOpacity onPress={() => setIsDialogVisible(true)}>
					<Text style={styles.paws}>Paws: {userInfo.paws}</Text>
				</TouchableOpacity>
			</View>

			<Title style={styles.sectionTitle}>Nearby Pet Sitting Requests</Title>
			{nearbyRequests.map(request => (
				<Card key={request.id} style={styles.card}>
					<Card.Title title={request.owner} subtitle={`${request.petType} - ${request.petName}`} />
					<Card.Content>
						<Paragraph>Date Needed: {request.date}</Paragraph>
					</Card.Content>
					<Card.Actions>
						<Button>View Details</Button>
					</Card.Actions>
				</Card>
			))}

			<Title style={styles.sectionTitle}>Tips & Articles for Pet Owners</Title>
			{tipsAndArticles.map(article => (
				<Card key={article.id} style={styles.card}>
					<Card.Content>
						<Title>{article.title}</Title>
						<Paragraph>{article.summary}</Paragraph>
					</Card.Content>
					<Card.Actions>
						<Button>Read More</Button>
					</Card.Actions>
				</Card>
			))}

			<Portal>
				<Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
					<Dialog.Title>Paws Explained</Dialog.Title>
					<Dialog.Content>
						<Paragraph>
							Paws are points you earn and spend within the app for pet sitting services. You start with 50 paws. Earn more by helping others!
						</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => setIsDialogVisible(false)}>Close</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10
	},
	profileContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10
	},
	avatar: {
		backgroundColor: '#6200ee'
	},
	paws: {
		fontSize: 16,
		color: '#6200ee',
		textDecorationLine: 'underline'
	},
	card: {
		marginBottom: 10
	},
	sectionTitle: {
		marginVertical: 10
	}
});

export default HomeScreen;
