import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors';

export default function AddNewAddress({ navigation, route }) {
  const { handleAddNewAddress } = route.params;
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    // Set the new address if initially provided
    if (route.params && route.params.newAddress) {
      setNewAddress(route.params.newAddress);
    }
  }, [route.params]);

  const handleAddAddress = () => {
    handleAddNewAddress(newAddress);
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new address"
        value={newAddress}
        onChangeText={text => setNewAddress(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
        <Text style={styles.buttonText}>Add Address</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: Colors.BUTTONCOLOR,
    paddingVertical: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});