import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { Text, Title, Button, Avatar, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EditProfileScreen: React.FC = ({ navigation }) => {
  const [name, setName] = useState('John Doe');
  const [location, setLocation] = useState('Austin, Texas');
  const [intro, setIntro] = useState('');
  const [availability, setAvailability] = useState('');
  const [selectedOption, setSelectedOption] = useState('petParent'); // Combined state
  const [selectedTags, setSelectedTags] = useState([]);

  const handleUpload = () => {
    alert('Upload Image');
  };

  const pets = [
    { id: 1, name: 'Andrew', avatar: 'dog' },
    { id: 2, name: 'Sammy', avatar: 'cat' }
  ];

  const handlePetPress = (petId) => {
    navigation.navigate('PetDetails', { petId });
  };

  const tags = ['Adventurous', 'Artistic', 'Bookworm', 'Fitness Enthusiast', 'Foodie', 'Music Lover', 'Nature Lover', 'Tech Savvy', 'Traveler', 'Movie Buff'];
  const handleTagPress = (tag) => {
    setSelectedTags((prevTags) => (prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]));
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          {[...Array(6)].map((_, index) => (
            <Pressable key={index} onPress={handleUpload} style={styles.imageBox}>
              <Avatar.Icon size={80} icon="plus" style={styles.avatar} />
            </Pressable>
          ))}
          <Text style={styles.infoText}>Add both yourself and your pet(s)! Even better with you all together! (maximum of 6 pictures)</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput style={styles.input} value={location} onChangeText={setLocation} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>I am </Text>
          <Pressable style={styles.checkboxContainer} onPress={() => setSelectedOption('petParent')}>
            <View style={[styles.checkbox, selectedOption === 'petParent' && styles.checkboxChecked]}>
              {selectedOption === 'petParent' && <Icon name="check" size={20} color="#ff9800" />}
            </View>
            <Text style={styles.checkboxText}>Pet Parent</Text>
          </Pressable>
          <Pressable style={styles.checkboxContainer} onPress={() => setSelectedOption('helper')}>
            <View style={[styles.checkbox, selectedOption === 'helper' && styles.checkboxChecked]}>
              {selectedOption === 'helper' && <Icon name="check" size={20} color="#ff9800" />}
            </View>
            <Text style={styles.checkboxText}>Don’t have a pet but would like to help</Text>
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Intro</Text>
          <TextInput style={[styles.input, styles.inputMultiline]} value={intro} onChangeText={setIntro} multiline />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Availability</Text>
          <TextInput style={[styles.input, styles.inputMultiline]} value={availability} onChangeText={setAvailability} multiline />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tags</Text>
          <View style={styles.tagsContainer}>
            {tags.map((tag) => (
              <Chip key={tag} selected={selectedTags.includes(tag)} onPress={() => handleTagPress(tag)} style={styles.chip}>
                {tag}
              </Chip>
            ))}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pets</Text>
          <View style={styles.petsContainer}>
            {pets.map((pet) => (
              <Pressable key={pet.id} onPress={() => handlePetPress(pet.id)}>
                <Avatar.Icon size={60} icon={pet.avatar} style={styles.petAvatar} />
                <Text style={styles.petName}>{pet.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    padding: 16
  },
  scrollViewContent: {
    paddingBottom: 32 // Add padding to the bottom of the ScrollView content
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  imageBox: {
    width: '32%',
    aspectRatio: 1,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    marginBottom: 8,
    backgroundColor: '#e0e0e0'
  },
  infoText: {
    color: '#757575'
  },
  inputContainer: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000'
  },
  input: {
    backgroundColor: '#F6F6F6',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  inputMultiline: {
    height: 80
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 4
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxChecked: {
    borderColor: '#ff9800',
    backgroundColor: '#fff3e0'
  },
  checkboxText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8
  },
  petsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  petAvatar: {
    margin: 8,
    backgroundColor: '#e0e0e0'
  },
  petName: {
    textAlign: 'center',
    color: '#000'
  }
});

export default EditProfileScreen;
