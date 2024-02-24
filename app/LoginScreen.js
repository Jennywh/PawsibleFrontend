import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Text } from 'react-native';

const LoginScreen = ({ onSwitchScreen }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// Add your sign-in with Google logic here

	const handleLogin = () => {
		// Add your login logic here
		console.log('Email:', email);
		console.log('Password:', password);
	};
	return (
		<View style={styles.container}>
			{/* ... (TextInputs) */}
			<TextInput placeholder='Email' value={email} onChangeText={setEmail} style={styles.input} />
			<TextInput placeholder='Password' value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
			<TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
				<Text style={styles.primaryButtonText}>Log In</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.secondaryAction} onPress={() => onSwitchScreen('signup')}>
				<Text style={styles.secondaryActionText}>Go to Sign Up</Text>
			</TouchableOpacity>
			{/* ... (Rest of your components) */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center', // centers in the flex direction (vertical by default)
		alignItems: 'center', // centers horizontally
		padding: 20
	},
	input: {
		height: 40,
		width: '100%', // Use the full width of the screen
		marginVertical: 10, // Adds spacing between inputs
		paddingLeft: 10,
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: 5
	},
	// Add other styles for buttons and text if needed

	primaryButton: {
		height: 50,
		width: '100%',
		backgroundColor: '#007bff', // Bootstrap primary color for example
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginTop: 10 // or more based on your design
	},
	primaryButtonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold'
	},
	secondaryAction: {
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	secondaryActionText: {
		color: '#007bff', // Same as button to indicate action
		fontSize: 16
	}
});

export default LoginScreen;
