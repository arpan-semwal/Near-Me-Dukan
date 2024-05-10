import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function RegisterSales({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pincode, setPincode] = useState('');

  const handleSubmit = () => {
    axios.post('http://192.168.29.68:3000/submit-form', {
      firstName,
      lastName,
      mobileNumber,
      pincode
    })
    .then(response => {
      console.log('Data saved successfully');
      navigation.navigate('OtpScreen',{ mobileNumber: mobileNumber });
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register as A Sales Associate</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={mobileNumber}
          onChangeText={text => setMobileNumber(text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          value={pincode}
          onChangeText={text => setPincode(text)}
          keyboardType="numeric"
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
};
