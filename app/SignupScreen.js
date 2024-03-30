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
  const [currentStep, setCurrentStep] = useState(1); // Start at the first step
  const [pets, setPets] = useState([{ name: '', type: '', careInstructions: '' }]);

  const [address, setAddress] = useState({
    street: '',
    city: '',
    region: '',
    zip: '',
    country: ''
  });

  const [contactInfo, setContactInfo] = useState({
    fullName: '',
    phoneNumber: '',
  });

  const handleAddressChange = (field, value) => {
    setAddress({
      ...address,
      [field]: value
    });
  };

  const handleContactInfoChange = (field, value) => {
    setContactInfo({
      ...contactInfo,
      [field]: value
    });
  };

  const validateBasicInfo = () => {
    if (!username || !email || !password) {
      alert('Please fill out all required fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex for email validation
    if (!email || !emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    if (!password || password.length < 6) {
      alert('Please enter a password with at least 6 characters.');
      return false;
    }
    
    return true;
  };

  const addPet = () => {
    setPets([...pets, { name: '', type: '', breed: '' }]);
  };

  const removePet = (index) => {
    const newPets = [...pets];
    newPets.splice(index, 1);
    setPets(newPets);
  };

  const handlePetChange = (index, fieldName, text) => {
    const newPets = [...pets];
    newPets[index][fieldName] = text;
    setPets(newPets);
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
  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <View>
            <TextInput label="Username *" value={username} onChangeText={setUsername} style={styles.input} mode="outlined" />
            <TextInput label="Email *" value={email} onChangeText={setEmail} style={styles.input} mode="outlined" />
            <TextInput label="Password *" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} mode="outlined" />
            <Button mode="contained" onPress={handleNext} style={styles.button}>
              Next
            </Button>
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <TextInput
              label="Full Name"
              value={contactInfo.fullName}
              onChangeText={(value) => handleContactInfoChange('fullName', value)}
              style={styles.input}
              mode="outlined"
              autoCapitalize="words"
            />
            <TextInput
              label="Phone Number"
              value={contactInfo.phoneNumber}
              onChangeText={(value) => handleContactInfoChange('phoneNumber', value)}
              style={styles.input}
              mode="outlined"
              keyboardType="phone-pad"
            />
            <Button mode="contained" onPress={() => setCurrentStep(currentStep - 1)} style={styles.button}>
              Back
            </Button>
            <Button mode="contained" onPress={handleNext} style={styles.button}>
              Next
            </Button>
          </View>
        );
      case 3:
        return (
          <View>
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
            <Button mode="contained" onPress={() => setCurrentStep(currentStep - 1)} style={styles.button}>
              Back
            </Button>
            <Button mode="contained" onPress={handleNext} style={styles.button}>
              Next
            </Button>
          </View>
        );
      case 4:
        return (
          <View>
            {pets.map((pet, index) => (
              <View key={index} style={styles.petContainer}>
                <TextInput
                  label="Pet Name"
                  value={pet.name}
                  onChangeText={(text) => handlePetChange(index, 'name', text)}
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Pet Type (e.g., Dog, Cat)"
                  value={pet.type}
                  onChangeText={(text) => handlePetChange(index, 'type', text)}
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Breed"
                  value={pet.breed}
                  onChangeText={(text) => handlePetChange(index, 'breed', text)}
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Special Care Instructions (optional)"
                  value={pet.careInstructions}
                  onChangeText={(text) => handlePetChange(index, 'careInstructions', text)}
                  multiline
                  numberOfLines={3}
                  mode="outlined"
                  style={styles.input}
                />
                <Button icon="minus-circle" mode="outlined" onPress={() => removePet(index)} style={styles.petButton}>
                  Remove Pet
                </Button>
              </View>
            ))}

            <Button icon="plus-circle" mode="contained" onPress={addPet} style={styles.button}>
              Add Another Pet
            </Button>

            <Button mode="contained" onPress={() => setCurrentStep(currentStep - 1)} style={styles.button}>
              Back
            </Button>
            <Button mode="contained" onPress={handleNext} style={styles.button}>
              Next
            </Button>
          </View>
        );

      case 5:
        return (
          <View>
            <Text style={styles.sectionTitle}>Finally, set up a nice profile pic!</Text>
            <TouchableOpacity onPress={pickImage}>
              {profilePicture ? (
                <Avatar.Image size={80} source={{ uri: profilePicture }} style={styles.avatar} />
              ) : (
                <Avatar.Icon size={80} icon="camera" style={styles.avatar} />
              )}
            </TouchableOpacity>
            <Button mode="contained" onPress={() => setCurrentStep(currentStep - 1)} style={styles.button}>
              Back
            </Button>
            <Button mode="contained" onPress={handleSignup} style={styles.button}>
              Sign Up
            </Button>
          </View>
        );
      default:
        return null;
    }
  };  

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        profilePicture,
        pets,
        contactInfo,
        address,
        paws: 50
      });
      navigation.replace('MainApp');
    } catch (error) {
      alert(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressBar style={styles.progressBar} styleAttr="Horizontal" color="#6200EE" progress={currentStep / 5} />
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
