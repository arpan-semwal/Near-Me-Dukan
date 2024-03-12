import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OptionScreen = ({ onSelect }) => {
  const options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
    'Option 9',
    'Option 10',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => onSelect(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // 70% opacity white background
    position: 'absolute',
    width: '70%',
    bottom: '10%', // Starts above the bottom navigation bar
    right: 0,
  },
  menuContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  option: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
});

export default OptionScreen;
