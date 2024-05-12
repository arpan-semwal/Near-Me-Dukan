import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function AddTeamMember({ route, navigation }) {
  const { mobileNumber } = route.params;
  const [newMobileNumber, setNewMobileNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pincode, setPincode] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [upi, setUpi] = useState('');
  const [pancard, setPancard] = useState('');

  const handleSubmit = () => {
    axios.post('http://192.168.29.67:3000/submit-team-member', {
      mobileNumber: newMobileNumber,
      firstName,
      lastName,
      pincode,
      aadhar,
      upi,
      pancard,
      addedBy: mobileNumber // Using the mobile number obtained from params as "addedBy"
    })
    .then(response => {
      console.log('Data saved successfully');
      navigation.goBack(); // Navigate back after submission
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="New Team Member Mobile Number"
        value={newMobileNumber}
        onChangeText={text => setNewMobileNumber(text)}
        keyboardType="phone-pad"
      />
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
        placeholder="Pincode"
        value={pincode}
        onChangeText={text => setPincode(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Aadhar Number"
        value={aadhar}
        onChangeText={text => setAadhar(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="UPI ID"
        value={upi}
        onChangeText={text => setUpi(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Pancard"
        value={pancard}
        onChangeText={text => setPancard(text)}
      />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
};
