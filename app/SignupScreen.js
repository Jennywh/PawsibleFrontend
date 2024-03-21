import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Divider, Avatar, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Make sure to install this package
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

const SignupScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [profilePicture, setProfilePicture] = useState('');
	const [age, setAge] = useState('');
	const [petName, setPetName] = useState('');
	const [petType, setPetType] = useState('');
	const [petBreed, setPetBreed] = useState('');
	const [currentStep, setCurrentStep] = useState(1); // Start at the first step

	const validateBasicInfo = () => {
		if (!username || !email || !password) {
			// Display an alert or some form of feedback to the user
			alert('Please fill out all required fields: Username, Email, and Password.');
			return false;
		}

		return true;
	};

	const handleNext = () => {
		if (currentStep === 1) {
			const isValid = validateBasicInfo();
			if (!isValid) return; // Stop the function if validation fails
		}

		// Proceed to the next step if validation passes or it's not the first step
		setCurrentStep(currentStep + 1);
	};

	const pickImage = async () => {
		// Request the permission to access the photo library
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			alert('Sorry, we need camera roll permissions to make this work!');
			return;
		}

		// Launch the picker to select an image
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1
		});
		console.log(result);

		if (!result.canceled) {
			const imageUri = result.assets[0].uri;
			setProfilePicture(imageUri);
		}
	};
	const renderStepContent = step => {
		switch (step) {
			case 1:
				return (
					<View>
						<TextInput label='Username *' value={username} onChangeText={setUsername} style={styles.input} mode='outlined' />
						<TextInput label='Email *' value={email} onChangeText={setEmail} style={styles.input} mode='outlined' />
						<TextInput label='Password *' value={password} onChangeText={setPassword} secureTextEntry style={styles.input} mode='outlined' />
						<Button mode='contained' onPress={handleNext} style={styles.button}>
							Next
						</Button>
					</View>
				);
			case 2:
				return (
					<View>
						<TouchableOpacity onPress={pickImage}>
							{profilePicture ? (
								<Avatar.Image size={80} source={{ uri: profilePicture }} style={styles.avatar} />
							) : (
								<Avatar.Icon size={80} icon='camera' style={styles.avatar} />
							)}
						</TouchableOpacity>
						<TextInput label='Age (optional)' value={age} onChangeText={setAge} keyboardType='numeric' style={styles.input} mode='outlined' />
						<Button mode='contained' onPress={() => setCurrentStep(currentStep - 1)} style={styles.button}>
							Back
						</Button>
						<Button mode='contained' onPress={handleNext} style={styles.button}>
							Next
						</Button>
					</View>
				);
			case 3:
				return (
					<View>
						<TextInput label='Pet Name (optional)' value={petName} onChangeText={setPetName} style={styles.input} mode='outlined' />
						<TextInput
							label='Pet Type (e.g., Dog, Cat) (optional)'
							value={petType}
							onChangeText={setPetType}
							style={styles.input}
							mode='outlined'
						/>
						<TextInput label='Breed (optional)' value={petBreed} onChangeText={setPetBreed} style={styles.input} mode='outlined' />
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
				profilePicture,
				age,
				petName,
				petType,
				petBreed,
				paws: 50
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
	avatar: {
		alignSelf: 'center',
		marginBottom: 20
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		// alignItems: 'center',
		padding: 20
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
