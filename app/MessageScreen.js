import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { List, Avatar, Divider, Badge } from 'react-native-paper';

// Add a new property for lastMessage and unreadCount to your messages
const fakeMessages = [
	{
		id: '1',
		from: 'Alice',
		subject: 'Lunch Plans',
		content: 'Hey, where do you want to go for lunch today?',
		lastMessage: '1h ago',
		unreadCount: 2,
		status: 'read'
	},
	{
		id: '2',
		from: 'Bob',
		subject: 'Project Update',
		content: 'Can we meet to discuss the project updates?',
		lastMessage: '2d ago',
		unreadCount: 0,
		status: 'sent'
	},
	{
		id: '3',
		from: 'Charlie',
		subject: 'Weekend Getaway',
		content: 'Thinking of going hiking this weekend. Interested?',
		lastMessage: '1w ago',
		unreadCount: 5,
		status: 'delivered'
	}
	// Add more fake messages here
];

// Message status icons
const messageStatusIcon = {
	read: 'check-all',
	delivered: 'check',
	sent: 'check'
};

const MessageScreen = () => {
	const renderMessageStatus = message => {
		if (message.unreadCount > 0) {
			return <Badge style={styles.badge}>{message.unreadCount}</Badge>;
		} else {
			return <List.Icon icon={messageStatusIcon[message.status]} style={styles.statusIcon} />;
		}
	};

	return (
		<View style={styles.container}>
			<List.Section>
				{fakeMessages.map(message => (
					<React.Fragment key={message.id}>
						<List.Item
							title={message.from}
							description={message.subject}
							left={props => <Avatar.Icon {...props} icon='email' />}
							right={() => (
								<View style={styles.rightContent}>
									<Text style={styles.lastUpdateTime}>{message.lastMessage}</Text>
									<View style={styles.statusContainer}>{renderMessageStatus(message)}</View>
								</View>
							)}
							onPress={() => {
								/* handle message press */
							}}
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
		flex: 1
	},
	rightContent: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	lastUpdateTime: {
		position: 'absolute',
		// backgroundColor: 'red',
		top: 0,
		right: 0
	},
	lastMessage: {
		fontSize: 12,
		color: 'grey',
		marginRight: 16
	}
});

export default MessageScreen;
