import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput, Button, Switch, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

const RequestPetSitterScreen = () => {
  const [petsDetails, setPetsDetails] = useState([]);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    region: '',
    zip: '',
    country: ''
  });

  useEffect(() => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      async function fetchPetsDetails() {
        try {
          const userDoc = await getDoc(doc(db, 'users', uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log(userData.pets);

            if (userData.pets && userData.pets.length > 0) {
              setPetsDetails(
                userData.pets.map((pet) => ({
                  name: pet.name || '',
                  breed: pet.breed || '',
                  type: pet.type || '',
                  careInstructions: pet.careInstructions || ''
                }))
              );
            } else {
              console.log('No pets details available');
            }
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setAddress({
                street: userData.address?.street || '',
                city: userData.address?.city || '',
                region: userData.address?.region || '',
                zip: userData.address?.zip || '',
                country: userData.address?.country || ''
              });
            } else {
              console.log('No such document!');
            }
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching pets details:', error);
        }
      }

      fetchPetsDetails();
    } else {
      console.log('User is not signed in');
    }
  }, []);

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
    setPetsDetails({
      ...petsDetails,
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
      petsDetails,
      serviceDate,
      startTime,
      endTime,
      additionalInfo,
      termsAccepted,
      creatorId: auth.currentUser.uid
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
        {petsDetails.length > 0 ? (
          petsDetails.map((pet, index) => (
            <View key={index}>
              <TextInput
                label="Pet's Name"
                value={pet.name}
                onChangeText={(value) => handlePetDetailChange(index, 'name', value)}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Breed"
                value={pet.breed}
                onChangeText={(value) => handlePetDetailChange(index, 'breed', value)}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Type"
                value={pet.type}
                onChangeText={(value) => handlePetDetailChange(index, 'type', value)}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Special Care Instructions"
                value={pet.careInstructions}
                onChangeText={(value) => handlePetDetailChange(index, 'careInstructions', value)}
                multiline
                style={styles.input}
                mode="outlined"
              />
            </View>
          ))
        ) : (
          <Text>No Pets Details Available</Text>
        )}
      </View>

      {/* Address Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        <TextInput
          label="Street Address"
          value={address.street}
          onChangeText={(value) => handleAddressChange('street', value)}
          style={styles.input}
          mode="outlined"
        />
        <TextInput label="City" value={address.city} onChangeText={(value) => handleAddressChange('city', value)} style={styles.input} mode="outlined" />
        <TextInput
          label="State/Province/Region"
          value={address.region}
          onChangeText={(value) => handleAddressChange('region', value)}
          style={styles.input}
          mode="outlined"
        />
        <TextInput label="Zip Code" value={address.zip} onChangeText={(value) => handleAddressChange('zip', value)} style={styles.input} mode="outlined" />
        <TextInput
          label="Country"
          value={address.country}
          onChangeText={(value) => handleAddressChange('country', value)}
          style={styles.input}
          mode="outlined"
        />
      </View>

      {/* Service Timing Section */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.title}>Service Date</Text>
          <DateTimePicker style={styles.picker} value={serviceDate} mode="date" display="default" onChange={onDateChange} />
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Start Time</Text>
          <DateTimePicker style={styles.picker} value={startTime} mode="time" display="default" onChange={(event, date) => setStartTime(date)} />
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>End Time</Text>
          <DateTimePicker style={styles.picker} value={endTime} mode="time" display="default" onChange={(event, date) => setEndTime(date)} />
        </View>
      </View>

      {/* Additional Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Other Information you'd like to share</Text>
        <TextInput
          label="Additional Information"
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          multiline
          numberOfLines={4} // Increase the number of lines for bigger area
          style={[styles.input, styles.textArea]}
          mode="outlined"
        />
      </View>

      {/* Terms of services check */}
      <View style={styles.checkboxContainer}>
        <Switch value={termsAccepted} onValueChange={setTermsAccepted} style={styles.switch} />
        <Text style={styles.checkboxLabel}>I agree to the Terms and Conditions.</Text>
      </View>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
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
    padding: 20
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
