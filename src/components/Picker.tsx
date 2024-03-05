import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface DropdownProps {
  category: string[];
  value: string[];
  onValueChange: (value: string[]) => void;
}

const Dropdown = ({category, value, onValueChange}: DropdownProps) => {
  const toggleSelection = (item: string) => {
    const newValue = value.includes(item)
      ? value.filter(selectedItem => selectedItem !== item)
      : [...value, item];
    onValueChange(newValue);
  };

  return (
    <>
      <View style={styles.header}>
        <Text>Select Category/Categories: </Text>
      </View>

      <View style={styles.container}>
        {category.map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => toggleSelection(item)}
            style={styles.item}>
            <View
              style={[
                styles.checkbox,
                {borderColor: value.includes(item) ? 'blue' : 'gray'},
              ]}>
              {value.includes(item) && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
  },
  container: {
    marginTop: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'blue',
  },
});

export default Dropdown;
