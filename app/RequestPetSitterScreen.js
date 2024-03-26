import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { TextInput, Button, Switch, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const RequestPetSitterScreen = () => {
	const [petDetails, setPetDetails] = useState({
		name: '',
		breed: '',
		age: '',
		specialCareInstructions: ''
	});
	const [address, setAddress] = useState({
		street: '',
		city: '',
		region: '',
		zip: '',
		country: ''
	});

	const [serviceDate, setServiceDate] = useState(new Date());
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());
	const [additionalInfo, setAdditionalInfo] = useState('');
	const [termsAccepted, setTermsAccepted] = useState(false);
	const handleAddressChange = (field, value) => {
		setAddress({
			...address,
			[field]: value
		});
	};

	const handlePetDetailChange = (name, value) => {
		setPetDetails({
			...petDetails,
			[name]: value
		});
	};

	const onDateChange = (event, selectedDate) => {
		setServiceDate(selectedDate || serviceDate);
	};

	const onStartTimeChange = (event, selectedTime) => {
		setStartTime(selectedTime || startTime);
	};

	const onEndTimeChange = (event, selectedTime) => {
		setEndTime(selectedTime || endTime);
	};

	const handleSubmit = async () => {
		const requestData = {
		  petDetails,
		  serviceDate,
		  startTime,
		  endTime,
		  additionalInfo,
		  termsAccepted,
		  creatorId: auth.currentUser.uid, 
		};
		
		try {
		  // Create a new document in the 'requests' collection with the request data
		  const requestRef = await addDoc(collection(db, 'requests'), requestData);
		  console.log('Request created with ID:', requestRef.id);
		  // Handle navigation or success feedback as needed
		} catch (error) {
		  console.error('Error creating request or updating user document:', error);
		  alert(error.message || 'An error occurred. Please try again.');
		}
	  };
	  
	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Pet Details</Text>
				<TextInput
					label="Pet's Name"
					value={petDetails.name}
					onChangeText={value => handlePetDetailChange('name', value)}
					style={styles.input}
					mode='outlined'
				/>
				<TextInput
					label='Breed'
					value={petDetails.breed}
					onChangeText={value => handlePetDetailChange('breed', value)}
					style={styles.input}
					mode='outlined'
				/>
				<TextInput
					label='Age'
					value={petDetails.age}
					onChangeText={value => handlePetDetailChange('age', value)}
					style={styles.input}
					mode='outlined'
				/>
				<TextInput
					label='Special Care Instructions'
					value={petDetails.specialCareInstructions}
					onChangeText={value => handlePetDetailChange('specialCareInstructions', value)}
					multiline
					style={styles.input}
					mode='outlined'
				/>
			</View>
			{/* Service Timing Section */}
			<View style={styles.section}>
				<View style={styles.row}>
					<Text style={styles.title}>Service Date</Text>
					<DateTimePicker style={styles.picker} value={serviceDate} mode='date' display='default' onChange={onDateChange} />
				</View>

				<View style={styles.row}>
					<Text style={styles.title}>Start Time</Text>
					<DateTimePicker style={styles.picker} value={startTime} mode='time' display='default' onChange={(event, date) => setStartTime(date)} />
				</View>

				<View style={styles.row}>
					<Text style={styles.title}>End Time</Text>
					<DateTimePicker style={styles.picker} value={endTime} mode='time' display='default' onChange={(event, date) => setEndTime(date)} />
				</View>
			</View>
			{/* Address Section */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Address</Text>
				<TextInput
					label='Street Address'
					value={address.street}
					onChangeText={value => handleAddressChange('street', value)}
					style={styles.input}
					mode='outlined'
				/>
				<TextInput label='City' value={address.city} onChangeText={value => handleAddressChange('city', value)} style={styles.input} mode='outlined' />
				<TextInput
					label='State/Province/Region'
					value={address.region}
					onChangeText={value => handleAddressChange('region', value)}
					style={styles.input}
					mode='outlined'
				/>
				<TextInput
					label='Zip Code'
					value={address.zip}
					onChangeText={value => handleAddressChange('zip', value)}
					style={styles.input}
					mode='outlined'
				/>
				<TextInput
					label='Country'
					value={address.country}
					onChangeText={value => handleAddressChange('country', value)}
					style={styles.input}
					mode='outlined'
				/>
			</View>
			{/* Additional Information Section */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Additional Information</Text>
				<TextInput
					label='Additional Information'
					value={additionalInfo}
					onChangeText={setAdditionalInfo}
					multiline
					numberOfLines={4} // Increase the number of lines for bigger area
					style={[styles.input, styles.textArea]}
					mode='outlined'
				/>
			</View>

			{/* Additional Information Section */}

			<View style={styles.checkboxContainer}>
				<Switch value={termsAccepted} onValueChange={setTermsAccepted} style={styles.switch} />
				<Text style={styles.checkboxLabel}>I agree to the Terms and Conditions.</Text>
			</View>
			<Button mode='contained' onPress={handleSubmit} style={styles.button}>
				Submit Request
			</Button>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		paddingBottom: 50 // Adjust this value as needed to make sure there's enough space
	},
	container: {
		flex: 1,
		padding: 20,
	},
	section: {
		marginBottom: 20
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10
	},
	input: {},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
		width: '30%' // Adjust the width as needed
	},
	picker: {
		flex: 1 // Take up the remaining space
	},

	timeTitleAndPicker: {
		marginRight: 20 // Adjust the space between the time pickers if needed
	},

	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20
	},
	checkboxLabel: {
		marginLeft: 10
	}
});

export default RequestPetSitterScreen;
