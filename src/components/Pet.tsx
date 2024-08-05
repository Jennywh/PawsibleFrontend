import React, { useState } from 'react';
import { View, StyleSheet, Image, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import { List, Avatar, Text, IconButton } from 'react-native-paper';

interface PetProps {
  name: string;
  type: string;
  image: string;
  age: string;
  breed: string;
  intro: string;
}

const Pet: React.FC<PetProps> = ({ name, type, image, age, breed, intro }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <List.Item
        title={name}
        description={type}
        left={() => <Avatar.Image size={50} source={{ uri: image }} />}
        right={() => <IconButton icon={expanded ? 'chevron-up' : 'chevron-down'} onPress={() => setExpanded(!expanded)} />}
        style={styles.listItem}
      />
      {expanded && (
        <View style={styles.expandedInfo}>
          <View style={styles.row}>
            <Text style={styles.detail}>{age} yrs old</Text>
            <Text style={styles.detail}>{breed}</Text>
          </View>

          <Text style={styles.intro}>{intro}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  } as ViewStyle,
  listItem: {
    paddingVertical: 10
  } as ViewStyle,
  expandedInfo: {
    paddingLeft: 60,
    paddingBottom: 10
  } as ViewStyle,
  detail: {
    fontSize: 14,
    color: 'gray'
  } as TextStyle,
  intro: {
    fontSize: 14,
    marginTop: 5
  } as TextStyle
});

export default Pet;
