import React, { useState } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, ScrollView, Pressable, Platform } from 'react-native';
import { Text, Avatar, Menu, Provider, Button } from 'react-native-paper';
import DropdownMenu from '../components/DropdownMenu';
import DateTimePicker from '@react-native-community/datetimepicker';

const PetDetailsScreen = ({ route, navigation }) => {
  const { petId } = route.params;
  const [petName, setPetName] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [intro, setIntro] = useState('');
  const maxDate = new Date();

  const handleSave = () => {
    // Handle save logic
    alert('Pet profile saved');
  };

  const handleUpload = () => {
    // Handle image upload logic
    alert('Upload Image');
  };
  const handleRemove = () => {
    // Handle remove logic
    alert('Pet profile removed');
  };

  const types = ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit'];
  const breedsMapping = {
    Dog: ['Labrador', 'Poodle', 'Bulldog', 'Beagle', 'Pug'],
    Cat: ['Siamese', 'Persian', 'Maine Coon', 'Ragdoll', 'Sphynx'],
    Bird: ['Parrot', 'Canary', 'Finch', 'Cockatoo', 'Lovebird'],
    Fish: ['Goldfish', 'Betta', 'Guppy', 'Molly', 'Angelfish'],
    Rabbit: ['Angora', 'Lop', 'Rex', 'Lionhead', 'Dutch']
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setBirthday(currentDate);
  };

  return (
    <Provider>
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.imageContainer}>
            <Pressable onPress={handleUpload} style={styles.imageBox}>
              <Avatar.Icon size={80} icon="plus" style={styles.avatar} />
            </Pressable>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pet Name</Text>
            <TextInput style={styles.input} value={petName} onChangeText={setPetName} />
          </View>
          <DropdownMenu title="Type" options={types} onSelect={setType} />
          {type !== '' && <DropdownMenu title="Breed" options={breedsMapping[type]} onSelect={setBreed} />}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Birthday</Text>
            <DateTimePicker maximumDate={maxDate} value={birthday} mode="date" display="default" onChange={onChange} style={styles.dateTimePicker} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Intro</Text>
            <TextInput style={[styles.input, styles.inputMultiline]} value={intro} onChangeText={setIntro} multiline />
          </View>
          <View style={styles.buttonContainer}>
            <Button mode="text" onPress={handleRemove} style={styles.removeButton} labelStyle={styles.removeButtonText}>
              X Remove
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 32
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16
  },
  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: '#e0e0e0'
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
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  inputMultiline: {
    height: 80
  },
  dateText: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  menuAnchor: {
    width: '100%'
  },
  dateTimePicker: {
    alignSelf: 'flex-start'
  },
  buttonContainer: {
    // alignItems: 'center',
    marginTop: 16
  },
  removeButton: {
    // backgroundColor: '#f44336',
  },
  removeButtonText: {
    // color: 'white'
  }
});

export default PetDetailsScreen;
