import { View, Text, TextInput , StyleSheet , Button } from 'react-native'
import React , {useState} from 'react';
import { useNavigation } from '@react-navigation/native';

export default function OtpScreen1() {
	
	const [phoneNumber, setPhoneNumber] = useState('');
	const navigation = useNavigation();
	
	const handleSubmitPhoneNumber = () => {
		// Validate phone number format and navigate to OTP screen
		if (phoneNumber.length === 10) { // Assuming Indian phone numbers with 10 digits
		  navigation.navigate('Otp2', { phoneNumber });
		} else {
		  alert('Please enter a valid phone number.');
		}
	  };
  return (
	<View style={styles.container}>
		<View style={styles.blueBox}>
			<Text style={styles.countryCode}>+91</Text>
			<TextInput
				style={styles.input}
				placeholder="10 digits mobile number"
				keyboardType="phone-pad"
				onChangeText={(text) => setPhoneNumber(text)}
			/>
		</View>
      <Button
        title="Submit"
		onPress={handleSubmitPhoneNumber}
      />
    </View>
  )
}
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  padding: 20,
	  borderWidth: 1, // Add border width
	  borderRadius: 5,
	},
	blueBox: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  borderRadius: 3,
	  borderWidth: 1, // Set border width to match the container
	  borderColor: '#007bff', // Set border color to blue
	  
	},
	countryCode: {
	  backgroundColor: '#007bff',
	  color: '#fff',
	  fontSize: 18,
	  marginRight: 10,
	 
	  paddingHorizontal: 8,
	  paddingVertical:10,
	},
	input: {
	  flex: 1,
	  height: 39,
	  color: '#000',
	  fontSize: 18,
	},
  });
  