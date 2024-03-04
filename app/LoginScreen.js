import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Snackbar, Text } from 'react-native-paper';
import { auth, db } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [visible, setVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleLogin = async () => {
		if (email.trim() === '' || password.trim() === '') {
			setErrorMessage('Email and password cannot be empty.');
			setVisible(true);
			return;
		}

		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			console.log('User:', user);

			// After successful login, fetch user data from Firestore

			const userDocRef = doc(db, 'users', user.uid);
			console.log('User doc ref:', userDocRef);
			const userDocSnap = await getDoc(userDocRef);

			if (userDocSnap.exists()) {
				const userData = userDocSnap.data();
				console.log('User data:', userData);
				// You can now use userData within your app, for example:
				// setUserData(userData); // if you have a state to hold user data
			} else {
				console.log('No such user data in Firestore!');
			}

			navigation.replace('MainApp');
		} catch (error) {
			setErrorMessage(error.message || 'An error occurred. Please try again.');
			setVisible(true);
		}
	};
	const onDismissSnackBar = () => setVisible(false);

	return (
		<View style={styles.container}>
			<TextInput label='Email' value={email} onChangeText={setEmail} style={styles.input} mode='outlined' />
			<TextInput label='Password' value={password} onChangeText={setPassword} secureTextEntry style={styles.input} mode='outlined' />
			<Button mode='contained' onPress={handleLogin} style={styles.button}>
				Login
			</Button>
			<Button onPress={() => navigation.replace('SignUp')} style={styles.linkButton}>
				Go to Sign Up
			</Button>
			<Snackbar
				visible={visible}
				onDismiss={onDismissSnackBar}
				duration={3000}
				action={{
					label: 'Close',
					onPress: () => {
						setVisible(false);
					}
				}}
			>
				{errorMessage}
			</Snackbar>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	},
	input: {
		width: '100%',
		marginVertical: 10
	},
	button: {
		marginTop: 10
	},
	linkButton: {
		marginTop: 20,
		padding: 0
	}
});

export default LoginScreen;
