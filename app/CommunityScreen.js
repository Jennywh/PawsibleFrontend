import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Paragraph, Avatar, IconButton, Menu } from 'react-native-paper';

const communityFeed = [
	// Initial posts with additional properties for likes, comments, etc.
	{
		id: '1',
		author: 'Sam',
		content: 'Found a great new park for dogs in the area!',
		image: require('../assets/favicon.png'),
		date: '2024-02-25',
		likes: 5,
		comments: 2,
		views: 150
	},
	{
		id: '2',
		author: 'Sam',
		content: 'Found a great new park for dogs in the area!',
		image: require('../assets/icon.png'),
		date: '2024-02-25',
		likes: 5,
		comments: 2,
		views: 150
	}
];

const LeftContent = props => <Avatar.Icon {...props} icon='paw' />;

const CommunityScreen = ({navigation}) => {

	const [posts, setPosts] = useState(communityFeed);
	const [visible, setVisible] = useState(false);

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);
	// Functions to handle likes and comments
	const handleLike = id => {
		const updatedPosts = posts.map(post => {
			if (post.id === id) {
				return { ...post, likes: post.likes + 1 };
			}
			return post;
		});
		setPosts(updatedPosts);
	};

	const handleComment = id => {
		// This function would ideally open a comment input dialog or navigate to a comment screen
	};
	const navigateToNewPost = () => {
		console.log('Navigate to new post screen');
		// This function would navigate to a new post screen
	};

	// Function to sort posts
	const sortPosts = method => {
		let sortedPosts;
		switch (method) {
			case 'newest':
				sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
				break;
			case 'hot':
				sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);
				break;
			default:
				sortedPosts = posts;
		}
		setPosts(sortedPosts);
	};

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<IconButton
					icon='plus'
					size={24}
					onPress={navigateToNewPost}
					style={styles.newPostButton} 
				/>
			)
		});
	}, [navigation]);

	return (
		<ScrollView style={styles.container}>
			{posts.map(post => (
				<Card key={post.id} style={styles.card}>
					<Card.Title title={post.author} subtitle={`Posted on ${post.date}`} left={LeftContent} />
					{post.image && <Card.Cover source={post.image} />}
					<Card.Content>
						<Paragraph>{post.content}</Paragraph>
					</Card.Content>
					<Card.Actions>
						<IconButton icon='thumb-up-outline' onPress={() => handleLike(post.id)} />
						<Text>{post.likes}</Text>
						<IconButton icon='comment-outline' onPress={() => handleComment(post.id)} />
						<Text>{post.comments}</Text>
					</Card.Actions>
				</Card>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#f0f0f0'
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: 'bold'
		// ... any other styles you wish for the 'Community' title
	},
	container: {
		flex: 1,
		padding: 10
	},
	card: {
		marginBottom: 10
	},
	headerButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#f0f0f0' // Light grey background or choose a color that matches your theme
	},
	button: {
		marginHorizontal: 5,
		// paddingHorizontal: 15,
		// paddingVertical: 10,
		borderRadius: 20, // Pill-shaped buttons
		justifyContent: 'center',
		backgroundColor: '#e7e7e7', // Slightly darker grey for buttons
		// Shadow effect for buttons (optional)
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	buttonText: {
		color: '#333', // Dark text for better readability
		fontWeight: 'bold'
	},
	newPostButton: {
		backgroundColor: 'white',
		marginRight: 10,
	}
});

export default CommunityScreen;
