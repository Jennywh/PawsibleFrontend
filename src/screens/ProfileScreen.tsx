import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { Avatar, Text, Title, Paragraph, Chip } from 'react-native-paper';
import Pet from '../components/Pet';
import ImageCarousel from '../components/ImageCarousel';

const { width: screenWidth } = Dimensions.get('window');

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <ImageCarousel />
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Title style={styles.name}>Jenny Wang</Title>
            <Chip style={styles.chip} textStyle={styles.chipText}>
              Pet Parent
            </Chip>
          </View>
          <View style={styles.row}>
            <Text style={styles.distance}>15 miles away from you</Text>
          </View>
          <Paragraph style={styles.description}>I have a cute cat and I'm happy to sit your cat as well.</Paragraph>
          <View style={styles.section}>
            <Title style={styles.title}>My Availability</Title>
            <Paragraph>Available for new opportunities.</Paragraph>
          </View>
          <View style={styles.section}>
            <Title>Tags</Title>
            <View style={styles.tagsContainer}>
              <Chip style={styles.tag}>UX Design</Chip>
              <Chip style={styles.tag}>Frontend Development</Chip>
              <Chip style={styles.tag}>React</Chip>
              <Chip style={styles.tag}>React Native</Chip>
            </View>
          </View>
          <View style={styles.section}>
            <Title>Pets</Title>
            <Pet
              name="Andrew"
              type="Cat"
              image="https://example.com/andrew.jpg"
              age="5"
              breed="British short hair"
              intro="I'm a super fat cat that only eats and sleeps every day"
            />
            <Pet name="Sammy" type="Cat" image="https://example.com/sammy.jpg" age="3" breed="Siamese" intro="I'm a playful cat who loves to climb and jump" />
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
    flex: 1
  },
  infoContainer: {
    padding: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  },
  title:{
    fontSize: 16,
    fontWeight: '500'
  },
  name: {
    marginTop: 10
  },
  chip: {
    height: 24
  },
  chipText: {
    fontSize: 14,
    lineHeight: 14
  },
  distance: {
    marginTop: 5
  },
  description: {
    marginTop: 10
  },
  section: {
    marginTop: 20
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tag: {
    margin: 5
  }
});

export default ProfileScreen;
