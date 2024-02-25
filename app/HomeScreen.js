import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, Dialog, Portal, Text } from 'react-native-paper';

// Fake Data
const userInfo = {
	name: 'Jenny Wang',
	petName: 'Andrew',
	paws: 50 
};

const nearbyRequests = [
	{ id: '1', owner: 'Alex', petType: 'Dog', petName: 'Buddy', date: 'March 5' },
	{ id: '2', owner: 'Jamie', petType: 'Cat', petName: 'Whiskers', date: 'March 8' }
];

const HomeScreen = () => {
	const [isDialogVisible, setIsDialogVisible] = useState(false);

	const handleRequestSitter = () => {
		console.log('Request Pet Sitter button tapped');
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.container}>
				<View style={styles.profileContainer}>
					<Avatar.Text size={40} label='JW' style={styles.avatar} />
					<View style={styles.userInfo}>
						<Text style={styles.greeting}>Hi {userInfo.petName}'s mom!</Text>
						<TouchableOpacity onPress={() => setIsDialogVisible(true)}>
							<Text style={styles.paws}>Paws: {userInfo.paws}</Text>
						</TouchableOpacity>
					</View>
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
			<Button icon='paw' mode='contained' onPress={handleRequestSitter} style={styles.floatingButton}>
				Request Pet Sitter
			</Button>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1
	},
	container: {
		flex: 1,
		padding: 10
	},
	profileContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10
	},
	avatar: {
		backgroundColor: '#6200ee'
	},
	userInfo: {
		marginLeft: 10
	},
	greeting: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#6200ee'
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
	},
	floatingButton: {
		position: 'absolute',
		bottom: 10,
		width: '60%',
		alignSelf: 'center',
		backgroundColor: '#6200ee' // Use a color that stands out
	}
});

export default HomeScreen;
