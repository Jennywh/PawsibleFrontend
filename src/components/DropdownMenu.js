import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownMenu = ({ title, options, onSelect, placeholder = 'Select an item' }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item.label);
    if (onSelect) {
      onSelect(item.value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <Dropdown
        style={styles.dropdown}
        data={options.map((option) => ({ label: option, value: option }))}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedItem}
        onChange={handleSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000'
  },
  dropdown: {
    height: 40,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: '#fff'
  }
});

export default DropdownMenu;
