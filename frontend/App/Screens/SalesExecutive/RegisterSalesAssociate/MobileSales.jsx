import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function MobileSales() {
  const [mobileNumber, setMobileNumber] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (mobileNumber.trim() !== '') {
      axios.post('http://192.168.29.67:3000/check-user', { mobileNumber:mobileNumber })
        .then(response => {
          if (response.data.exists) {
            navigation.navigate('OtpScreen', { mobileNumber:mobileNumber });
          } else {
            navigation.navigate('RegisterSales', { mobileNumber:mobileNumber });
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      alert('Please enter a valid mobile number');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Enter Mobile Number</Text>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={text => setMobileNumber(text)}
        keyboardType="phone-pad"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
