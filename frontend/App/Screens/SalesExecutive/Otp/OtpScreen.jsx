import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function OtpScreen({ navigation , route }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  
  const { mobileNumber } = route.params;

  const handleVerifyOtp = () => {
    if (otp === '1234') {
      navigation.navigate('SalesHomePage' , {mobileNumber:mobileNumber});
    } else {
      setError('Incorrect OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter OTP : {mobileNumber}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={text => setOtp(text)}
        keyboardType="numeric"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Verify OTP" onPress={handleVerifyOtp} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
};
