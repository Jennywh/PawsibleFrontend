import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Divider, Avatar, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Make sure to install this package
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignupScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [profilePicture, setProfilePicture] = useState('');
	const [age, setAge] = useState('');
	const [petName, setPetName] = useState('');
	const [petType, setPetType] = useState('');
	const [petBreed, setPetBreed] = useState('');
	const [location, setLocation] = useState('');
	const [petInfo, setPetInfo] = useState('');
	const [availability, setAvailability] = useState('');
	const [emergencyContact, setEmergencyContact] = useState('');
	const [aboutMe, setAboutMe] = useState('');
	const [preferences, setPreferences] = useState('');
	const [currentStep, setCurrentStep] = useState(1); // Start at the first step

	const renderStepContent = step => {
		switch (step) {
			case 1:
				return (
					<View>
						<TextInput label='Username' value={username} onChangeText={setUsername} style={styles.input} mode='outlined' />
						<TextInput label='Email' value={email} onChangeText={setEmail} style={styles.input} mode='outlined' />
						<TextInput label='Password' value={password} onChangeText={setPassword} secureTextEntry style={styles.input} mode='outlined' />
						<Button mode='contained' onPress={() => setCurrentStep(currentStep + 1)} style={styles.button}>
							Next
						</Button>
					</View>
				);
			case 2:
				return (
					<View>
						<TouchableOpacity
							onPress={() => {
								/* Logic to add profile picture */
							}}
						>
							<Avatar.Icon size={80} icon='camera' style={styles.avatar} />
						</TouchableOpacity>
						<TextInput label='Age' value={age} onChangeText={setAge} keyboardType='numeric' style={styles.input} mode='outlined' />
						<Button mode='contained' onPress={() => setCurrentStep(currentStep - 1)} style={styles.button}>
							Back
						</Button>
						<Button mode='contained' onPress={() => setCurrentStep(currentStep + 1)} style={styles.button}>
							Next
						</Button>
					</View>
				);
			case 3:
				return (
					<View>
						<TextInput label='Pet Name' value={petName} onChangeText={setPetName} style={styles.input} mode='outlined' />
						<TextInput label='Pet Type (e.g., Dog, Cat)' value={petType} onChangeText={setPetType} style={styles.input} mode='outlined' />
						<TextInput label='Breed' value={petBreed} onChangeText={setPetBreed} style={styles.input} mode='outlined' />
						<Button mode='contained' onPress={() => setCurrentStep(currentStep - 1)} style={styles.button}>
							Back
						</Button>
						<Button mode='contained' onPress={handleSignup} style={styles.button}>
							Sign Up
						</Button>
					</View>
				);
			default:
				return null;
		}
	};

	const handleSignup = async () => {
		if (!email || !password || !username) {
			alert('Username, email, and password are required');
			return;
		}
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			await setDoc(doc(db, 'users', user.uid), {
				username,
				email,
				location,
				petInfo,
				availability,
				emergencyContact,
				aboutMe,
				preferences
				// Include other fields as necessary
			});
			navigation.replace('MainApp');
		} catch (error) {
			alert(error.message || 'An error occurred. Please try again.');
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<ProgressBar style={styles.progressBar} styleAttr='Horizontal' color='#6200EE' progress={currentStep / 3} />
			{renderStepContent(currentStep)}
			{/* go to login */}
			<View style={styles.section}>
				<Divider style={styles.divider} />
				<Text style={styles.sectionTitle}>Already have an account?</Text>
				<Button onPress={() => navigation.replace('Login')} style={styles.linkButton}>
					Login
				</Button>
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		// alignItems: 'center',
		padding: 20,
		// paddingTop: 80
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
	},
	
	input: {
		marginBottom: 10
	},
	button: {
		marginTop: 20
	},
	linkButton: {
		marginTop: 10
	},
	section: {
		marginBottom: 20
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10
	},
	divider: {
		marginBottom: 20
	},
	avatar: {
		alignSelf: 'center',
		marginBottom: 20
	}
});

export default SignupScreen;
