import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, Dialog, Portal, Text, IconButton, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

// Fake Data
const userInfo = {
	name: 'Jenny Wang',
	petName: 'Andrew',
	paws: 50
};

const nearbyRequests = [
	{
		id: '1',
		owner: 'Alex',
		pets: [{ type: 'Dog', name: 'Buddy' }],
		date: 'March 5',
		time: '1:30pm - 4:00pm',
		distance: '3 miles',
		location: 'Central Park Area'
	},
	{
		id: '2',
		owner: 'Jamie',
		pets: [
			{ type: 'Cat', name: 'Whiskers' },
			{ type: 'Parrot', name: 'Kiwi' },
			{ type: 'Rabbit', name: 'Fluffy' },
			{ type: 'Fish', name: 'Nemo' },
			{ type: 'Turtle', name: 'Shelly' }
		],
		date: 'March 8',
		time: '10:00am - 3:00pm',
		distance: '1.5 miles',
		location: 'Uptown Area'
	},
	{
		id: '3',
		owner: 'Taylor',
		pets: [{ type: 'Cat', name: 'Shadow' }],
		date: 'March 9',
		time: '2:00pm - 6:00pm',
		distance: '4 miles',
		location: 'Downtown Area'
	}
	// ...add more requests as needed
];

const HomeScreen = ({navigation}) => {
	const [isDialogVisible, setIsDialogVisible] = useState(false);

	const handleRequestSitter = () => {
		console.log('Request Pet Sitter button tapped');
		navigation.navigate('RequestPetSitterScreen')
	};

	const handleViewDetails = id => {
		console.log(`View Details button tapped: ${id}`);
	};

	const handleDecline = id => {
		console.log(`Declined request with id: ${id}`);
		// Add logic to handle the decline action here
	};
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.container}>
				<View style={styles.userInfoContainer}>
					<Avatar.Text size={48} label='JW' style={styles.avatar} />
					<View style={styles.userInfoText}>
						<Text style={styles.greeting}>Hi {userInfo.name}!</Text>
						<View style={styles.pawsInfo}>
							<MaterialCommunityIcons name='paw' size={20} color='#4b5563' />
							<Text style={styles.pawsCount}>{userInfo.paws} Paws</Text>
						</View>
					</View>
				</View>
				<Title style={styles.sectionTitle}>Nearby Pet Sitting Requests</Title>

				{nearbyRequests.map(request => (
					<Card key={request.id} style={styles.card}>
						<Card.Title
							title={request.owner}
							subtitle={<Text style={{ fontWeight: 'bold' }}>{request.date}</Text>}
							left={props => <Avatar.Icon {...props} icon='paw' />}
							leftStyle={{ marginRight: 8 }}
						/>
						<Card.Content>
							<Paragraph>
								<MaterialCommunityIcons name='paw' size={16} />
								{request.pets.map(pet => ` ${pet.type} - ${pet.name}`).join(',')}
							</Paragraph>
							<Paragraph>
								<MaterialCommunityIcons name='clock-outline' size={16} />
								{` ${request.time}`}
							</Paragraph>
							<Paragraph>
								<MaterialCommunityIcons name='map-marker' size={16} />
								{` ${request.distance} - ${request.location} `}
							</Paragraph>
						</Card.Content>
						<Divider />
						<Card.Actions style={styles.cardActions}>
							<Button
								mode='text'
								onPress={() => handleDecline(request.id)}
							>
								<Text style={{ color: 'red' }}>Decline</Text>
							</Button>
							<Button mode='text' onPress={() => handleViewDetails(request.id)}>
								View Details
							</Button>
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
	userInfoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#f3f4f6' // A subtle background color
	},
	avatar: {
		marginRight: 10
	},
	userInfoText: {
		flex: 1
	},
	greeting: {
		fontWeight: 'bold',
		fontSize: 18,
		color: '#111827' // A color that stands out
	},
	pawsInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 4
	},
	pawsCount: {
		marginLeft: 5,
		fontSize: 16,
		color: '#6b7280' // A softer color for less emphasis
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
	},
	cardActions: {
		justifyContent: 'space-between',
		padding: 8
	}
});

export default HomeScreen;
